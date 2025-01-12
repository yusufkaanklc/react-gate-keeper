import type { IPermitlyRole } from "@/interfaces/IPermitlyRole";
import type { IPermitlyUser } from "@/interfaces/IPermitlyUser";

export type ISelectorType = "attribute" | "class" | "id";

/**
 * Uygulama genelinde kullanılan durum yönetimi için ana depo arayüzü
 * @interface IPermitlyStore
 * @property {IPermitlyRole[]} roles - Sistemdeki rollerin listesi
 * @property {function} setRoles - Rol listesini güncellemek için kullanılan fonksiyon
 * @property {IPermitlyUser | null} user - Mevcut oturum açmış kullanıcı bilgisi. Oturum açılmamışsa null
 * @property {function} setUser - Kullanıcı bilgisini güncellemek için kullanılan fonksiyon
 */
export interface IPermitlyStore {
	roles: IPermitlyRole[];
	setRoles: (roles: IPermitlyRole[]) => void;
	user: IPermitlyUser | null;
	setUser: (user: IPermitlyUser) => void;
}
