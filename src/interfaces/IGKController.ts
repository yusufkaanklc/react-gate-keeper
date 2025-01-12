import type { ReactNode } from "react";

/**
 * GK (Gate Keeper) Denetleyici arayüzü
 * @interface IGKController
 *
 * @property {ReactNode} children - Kontrol edilecek alt bileşenler
 * @property {boolean} [visibleControlActive] - Görünürlük kontrolünün aktif olup olmadığı
 * @property {boolean} [clickableControlActive] - Tıklanabilirlik kontrolünün aktif olup olmadığı
 * @property {string[]} [permissions] - İzin kontrolleri için gerekli yetki listesi
 */
export interface IGKController {
	children: ReactNode;
	notAllowedComponent?: ReactNode;
	visibleControlActive?: boolean;
	clickableControlActive?: boolean;
	permissions?: string[];
}
