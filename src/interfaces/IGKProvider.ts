import type { ReactNode } from "react";

/**
 * GK Provider için arayüz tanımlaması
 * @interface IGKProvider
 *
 * @property {ReactNode} children - Provider içerisinde render edilecek alt bileşenler
 * @property {boolean} [isGKActive] - GK'nın aktif olup olmadığını belirten isteğe bağlı bayrak
 * @property {HTMLElement} [rootElement] - Provider'ın bağlanacağı kök HTML elementi (isteğe bağlı)
 */
export interface IGKProvider {
	children: ReactNode;
	isGKActive?: boolean;
	rootElement?: HTMLElement;
}
