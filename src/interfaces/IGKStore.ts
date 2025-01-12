import type { IGKRole } from "./IGKRole";
import type { IGKUser } from "./IGKUser";

export type ISelectorType = "attribute" | "class" | "id";

/**
 * Uygulama genelinde kullanılan durum yönetimi için ana depo arayüzü
 * @interface IGKStore
 * @property {IGKRole[]} roles - Sistemdeki rollerin listesi
 * @property {function} setRoles - Rol listesini güncellemek için kullanılan fonksiyon
 * @property {IGKUser | null} user - Mevcut oturum açmış kullanıcı bilgisi. Oturum açılmamışsa null
 * @property {function} setUser - Kullanıcı bilgisini güncellemek için kullanılan fonksiyon
 */
export interface IGKStore {
	roles: IGKRole[];
	setRoles: (roles: IGKRole[]) => void;
	user: IGKUser | null;
	setUser: (user: IGKUser) => void;
}
