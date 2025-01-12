import type { IGKProvider } from "@/interfaces/IGKProvider";
import { useGKStore } from "@/stores/GKStore";
import { createMutationObserver } from "@/utils/ObserverUtil";
import { type JSX, useEffect, useRef } from "react";

/**
 * GateKeeper bileşeni, kullanıcı izinlerine göre UI elementlerinin görünürlüğünü ve tıklanabilirliğini kontrol eder
 * @param {Object} props - Bileşen props'ları
 * @param {boolean} [props.isGKActive=true] - GateKeeper'ın aktif olup olmadığını belirler
 * @param {HTMLElement} [props.rootElement=document.body] - İzlenecek kök element
 * @param {React.ReactNode} props.children - Alt bileşenler
 * @returns {JSX.Element} GateKeeper container elementi
 */
export const GateKeeperProvider = ({ isGKActive = true, rootElement = document.body, children }: IGKProvider): JSX.Element => {
	// GateKeeper container'ı için ref
	const GKFinderRef = useRef<HTMLDivElement>(null);

	// Global state'ten rol ve kullanıcı bilgilerini al
	const roles = useGKStore((state) => state.roles);
	const user = useGKStore((state) => state.user);

	useEffect(() => {
		// Gerekli koşullar sağlanmıyorsa effect'i çalıştırma
		if (!GKFinderRef.current || !isGKActive || !user || !roles) return;

		const node = rootElement || GKFinderRef.current;

		/**
		 * Verilen HTML elementi içindeki izin gerektiren elementleri kontrol eder
		 * @param {HTMLElement} targetNode - Kontrol edilecek hedef element
		 */
		const checkForElements = (targetNode: HTMLElement) => {
			if (!GKFinderRef.current) return;
			// İzin attribute'u olan tüm elementleri seç
			const elements = targetNode.querySelectorAll("[data-gk-permissions]");

			for (const element of elements) {
				// Element üzerindeki izin bilgisini al
				const elementPermissions = element.getAttribute("data-gk-permissions");
				if (!elementPermissions) continue;

				try {
					// İzinleri JSON formatından diziye çevir
					const elementPermissionsArray = JSON.parse(elementPermissions) as string[];
					if (!Array.isArray(elementPermissionsArray)) continue;

					// Görünürlük ve tıklanabilirlik kontrollerini al
					const [visibleControl, clickableControl] = [
						element.getAttribute("data-gk-visible-control-active") === "true",
						element.getAttribute("data-gk-clickable-control-active") === "true",
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
						htmlElement.setAttribute("data-gk-not-allowed", "true");
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
			target: rootElement || GKFinderRef.current,
			callback: observerCallback,
		});

		startObserving();

		return () => disconnectObserver();
	}, [rootElement, isGKActive, user, roles]);

	return <div ref={GKFinderRef}>{children}</div>;
};
