/**
 * Rol bilgilerini tutan arayüz
 * @interface IPermitlyRole
 * @property {string} id - Rolün benzersiz tanımlayıcısı
 * @property {string[]} permissions - Role ait izinlerin listesi
 */
export interface IPermitlyRole {
	id: string;
	permissions: string[];
}
