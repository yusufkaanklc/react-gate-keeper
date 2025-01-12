import type { ReactNode } from "react";

/**
 * Permitly Provider için arayüz tanımlaması
 * @interface IPermitlyProvider
 *
 * @property {ReactNode} children - Provider içerisinde render edilecek alt bileşenler
 * @property {boolean} [isPermitlyActive] - Permitly'nin aktif olup olmadığını belirten isteğe bağlı bayrak
 * @property {HTMLElement} [rootElement] - Provider'ın bağlanacağı kök HTML elementi (isteğe bağlı)
 */
export interface IPermitlyProvider {
	children: ReactNode;
	isPermitlyActive?: boolean;
	rootElement?: HTMLElement;
}
