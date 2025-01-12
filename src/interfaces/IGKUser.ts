/**
 * Sistemdeki kullanıcı bilgilerini tutan arayüz
 * @interface IGKUser
 * @property {string} name - Kullanıcının adı
 * @property {string[]} roles - Kullanıcıya atanmış rollerin listesi
 */
export interface IGKUser {
	name: string;
	roles: string[];
}
