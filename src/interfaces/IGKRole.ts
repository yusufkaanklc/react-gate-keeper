/**
 * Rol bilgilerini tutan arayüz
 * @interface IGKRole
 * @property {string} id - Rolün benzersiz tanımlayıcısı
 * @property {string[]} permissions - Role ait izinlerin listesi
 */
export interface IGKRole {
	id: string;
	permissions: string[];
}
