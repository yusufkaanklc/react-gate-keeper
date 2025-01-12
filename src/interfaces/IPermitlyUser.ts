/**
 * Sistemdeki kullanıcı bilgilerini tutan arayüz
 * @interface IPermitlyUser
 * @property {string} name - Kullanıcının adı
 * @property {string[]} roles - Kullanıcıya atanmış rollerin listesi
 */
export interface IPermitlyUser {
	name: string;
	roles: string[];
}
