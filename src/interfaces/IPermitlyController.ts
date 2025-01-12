import type { ReactNode } from "react";

/**
 * Permitly Denetleyici arayüzü
 * @interface IPermitlyController
 *
 * @property {ReactNode} children - Kontrol edilecek alt bileşenler
 * @property {boolean} [visibleControlActive] - Görünürlük kontrolünün aktif olup olmadığı
 * @property {boolean} [clickableControlActive] - Tıklanabilirlik kontrolünün aktif olup olmadığı
 * @property {string[]} [permissions] - İzin kontrolleri için gerekli yetki listesi
 */
export interface IPermitlyController {
	children: ReactNode;
	notAllowedComponent?: ReactNode;
	visibleControlActive?: boolean;
	clickableControlActive?: boolean;
	permissions?: string[];
}
