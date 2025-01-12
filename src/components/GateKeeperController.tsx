import type { IGKController } from "@/interfaces/IGKController";
import { createMutationObserver } from "@/utils/ObserverUtil";
import { useEffect, useRef, useState } from "react";

// GateKeeperController bileşeni, erişim kontrolü sağlayan bir wrapper bileşenidir
export const GateKeeperController = ({
	children, // İçerik olarak gösterilecek alt bileşenler
	permissions, // İzin kontrolleri için gerekli yetkiler
	visibleControlActive = false, // Görünürlük kontrolü aktif mi?
	clickableControlActive = true, // Tıklanabilirlik kontrolü aktif mi?
	notAllowedComponent = <div>Not allowed</div>, // İzin olmadığında gösterilecek bileşen
}: IGKController) => {
	// DOM referansı için ref oluşturuyoruz
	const ref = useRef<HTMLSpanElement>(null);
	// İzin durumunu takip eden state
	const [isNotAllowed, setIsNotAllowed] = useState(false);

	// İzinleri string formatına çeviriyoruz
	const permissionsString = JSON.stringify(permissions);

	useEffect(() => {
		// Ref mevcut değilse işlemi sonlandır
		if (!ref.current) return;

		// DOM değişikliklerini izleyen callback fonksiyonu
		const callback = (mutations: MutationRecord[]) => {
			for (const mutation of mutations) {
				// Öznitelik değişikliklerini kontrol et
				if (mutation.type === "attributes") {
					// data-gk-not-allowed özniteliği değiştiyse
					if (mutation.attributeName === "data-gk-not-allowed") {
						setIsNotAllowed((mutation.target as HTMLElement).getAttribute("data-gk-not-allowed") === "true");
					}
				}
			}
		};

		// MutationObserver oluştur ve başlat
		const { startObserving, disconnectObserver } = createMutationObserver({
			target: ref.current,
			callback,
			config: { attributes: true },
		});

		startObserving();

		// Component unmount olduğunda observer'ı temizle
		return () => disconnectObserver();
	}, []);

	return (
		<span
			ref={ref}
			data-gk-permissions={permissionsString} // İzinleri data attribute olarak ekliyoruz
			data-gk-visible-control-active={visibleControlActive} // Görünürlük kontrolü durumu
			data-gk-clickable-control-active={clickableControlActive} // Tıklanabilirlik kontrolü durumu
		>
			{isNotAllowed ? notAllowedComponent : children}
		</span>
	);
};
