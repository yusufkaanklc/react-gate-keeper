import type { IPermitlyProvider } from "@/interfaces/IPermitlyProvider";
import { usePermitlyStore } from "@/stores/PermitlyStore";
import { createMutationObserver } from "@/utils/ObserverUtil";
import { useEffect, useRef } from "react";

/**
 * PermitlyProvider bileşeni, kullanıcı izinlerine göre UI elementlerinin görünürlüğünü ve tıklanabilirliğini kontrol eder
 * @param {Object} props - Bileşen props'ları
 * @param {boolean} [props.isPermitlyActive=true] - Permitly'nin aktif olup olmadığını belirler
 * @param {HTMLElement} [props.rootElement=document.body] - İzlenecek kök element
 * @param {React.ReactNode} props.children - Alt bileşenler
 */
export const PermitlyProvider = ({ isPermitlyActive = true, rootElement = document.body, children }: IPermitlyProvider) => {
	// Permitly container'ı için ref
	const PermitlyFinderRef = useRef<HTMLDivElement>(null);

	// Global state'ten rol ve kullanıcı bilgilerini al
	const roles = usePermitlyStore((state) => state.roles);
	const user = usePermitlyStore((state) => state.user);

	useEffect(() => {
		// Gerekli koşullar sağlanmıyorsa effect'i çalıştırma
		if (!PermitlyFinderRef.current || !isPermitlyActive || !user || !roles) return;

		const node = rootElement || PermitlyFinderRef.current;

		/**
		 * Verilen HTML elementi içindeki izin gerektiren elementleri kontrol eder
		 * @param {HTMLElement} targetNode - Kontrol edilecek hedef element
		 */
		const checkForElements = (targetNode: HTMLElement) => {
			if (!PermitlyFinderRef.current) return;
			// İzin attribute'u olan tüm elementleri seç
			const elements = targetNode.querySelectorAll("[data-permitly-permissions]");

			for (const element of elements) {
				// Element üzerindeki izin bilgisini al
				const elementPermissions = element.getAttribute("data-permitly-permissions");
				if (!elementPermissions) continue;

				try {
					// İzinleri JSON formatından diziye çevir
					const elementPermissionsArray = JSON.parse(elementPermissions) as string[];
					if (!Array.isArray(elementPermissionsArray)) continue;

					// Görünürlük ve tıklanabilirlik kontrollerini al
					const [visibleControl, clickableControl] = [
						element.getAttribute("data-permitly-visible-control-active") === "true",
						element.getAttribute("data-permitly-clickable-control-active") === "true",
					];

					// Kullanıcının gerekli izinlere sahip olup olmadığını kontrol et
					const isUserHasPermission = elementPermissionsArray.every((permission) =>
						user.roles
							.map((userRole) => roles.find((role) => role.id === userRole))
							.some((role) => role?.permissions.includes(permission)),
					);

					if (isUserHasPermission) continue;

					// İzin yoksa ve tıklanabilirlik kontrolü aktifse, tıklama olaylarını engelle
					if (clickableControl) {
						const htmlElement = element as HTMLElement;
						htmlElement.addEventListener("click", (e) => {
							e.preventDefault();
							e.stopPropagation();
						});
					}

					// İzin yoksa ve görünürlük kontrolü aktifse, attribute'u ekler
					if (visibleControl) {
						const htmlElement = element as HTMLElement;
						htmlElement.setAttribute("data-permitly-not-allowed", "true");
					}
				} catch (error) {
					console.error("JSON parse error:", error);
				}
			}
		};

		// İlk yükleme kontrolü
		checkForElements(node);

		/**
		 * DOM değişikliklerini izleyen callback fonksiyonu
		 * @param {MutationRecord[]} mutations - DOM değişiklik kayıtları
		 */
		const observerCallback = (mutations: MutationRecord[]) => {
			for (const mutation of mutations) {
				if (mutation.type === "childList") {
					for (const node of mutation.addedNodes) {
						if (node instanceof HTMLElement) {
							checkForElements(node);
						}
					}
				}
			}
		};

		// MutationObserver oluştur ve başlat
		const { startObserving, disconnectObserver } = createMutationObserver({
			target: rootElement || PermitlyFinderRef.current,
			callback: observerCallback,
		});

		startObserving();

		return () => disconnectObserver();
	}, [rootElement, isPermitlyActive, user, roles]);

	return <div ref={PermitlyFinderRef}>{children}</div>;
};
