import type { IObserverUtil } from "@/interfaces/IObserverUtil";

// MutationObserver için instance benzeri bir yapı oluşturalım
export const createMutationObserver = ({
	target = document.body,
	config = { subtree: true, childList: true },
	callback,
}: IObserverUtil) => {
	// MutationObserver'ı bir değişkenle kontrol edelim
	let observer: MutationObserver | null = null;

	// Observer başlatma fonksiyonu
	const startObserving = () => {
		// Eğer observer zaten varsa, yeni bir tane başlatma
		if (observer || typeof callback !== "function") return;

		// Observer'ı oluştur
		observer = new MutationObserver(callback);
		// Observer'ı hedef üzerinde gözlemlemeye başlatıyoruz
		observer.observe(target, config);
	};

	// Observer'ı durdurma fonksiyonu
	const disconnectObserver = () => {
		if (!observer) return;
		observer.disconnect();
		observer = null;
	};

	// Observer'ı yeniden başlatma fonksiyonu
	const restart = () => {
		disconnectObserver(); // Önceki observer'ı durduruyoruz
		startObserving(); // Yeni observer'ı başlatıyoruz
	};

	// Observer yönetim fonksiyonlarını döndürüyoruz
	return { startObserving, disconnectObserver, restart };
};
