import type { IPermitlyRole } from "@/interfaces/IPermitlyRole";
import type { IPermitlyUser } from "@/interfaces/IPermitlyUser";
import { usePermitlyStore } from "@/stores/PermitlyStore";

/**
 * GateKeeper hook'u - Kullanıcı ve rol yönetimi için özel hook
 * @returns {Object} Rol ve kullanıcı yönetimi için fonksiyonlar içeren nesne
 * @property {Function} setRoles - Rolleri güncellemek için kullanılan fonksiyon
 * @property {Function} getRoles - Mevcut rolleri getiren fonksiyon
 * @property {Function} setUser - Kullanıcı bilgisini güncellemek için kullanılan fonksiyon
 * @property {Function} getUser - Mevcut kullanıcı bilgisini getiren fonksiyon
 */
export const usePermitly = () => {
	const setRoles = (roles: IPermitlyRole[]) => usePermitlyStore.getState().setRoles(roles);
	const getRoles = () => usePermitlyStore.getState().roles;
	const setUser = (user: IPermitlyUser) => usePermitlyStore.getState().setUser(user);
	const getUser = () => usePermitlyStore.getState().user;

	return { setRoles, getRoles, setUser, getUser };
};
