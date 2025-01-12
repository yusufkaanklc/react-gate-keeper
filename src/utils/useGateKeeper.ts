import type { IGKRole } from "@/interfaces/IGKRole";
import type { IGKUser } from "@/interfaces/IGKUser";
import { useGKStore } from "@/stores/GKStore";

/**
 * GateKeeper hook'u - Kullanıcı ve rol yönetimi için özel hook
 * @returns {Object} Rol ve kullanıcı yönetimi için fonksiyonlar içeren nesne
 * @property {Function} setRoles - Rolleri güncellemek için kullanılan fonksiyon
 * @property {Function} getRoles - Mevcut rolleri getiren fonksiyon
 * @property {Function} setUser - Kullanıcı bilgisini güncellemek için kullanılan fonksiyon
 * @property {Function} getUser - Mevcut kullanıcı bilgisini getiren fonksiyon
 */
export const useGateKeeper = () => {
	const setRoles = (roles: IGKRole[]) => useGKStore.getState().setRoles(roles);
	const getRoles = () => useGKStore.getState().roles;
	const setUser = (user: IGKUser) => useGKStore.getState().setUser(user);
	const getUser = () => useGKStore.getState().user;

	return { setRoles, getRoles, setUser, getUser };
};
