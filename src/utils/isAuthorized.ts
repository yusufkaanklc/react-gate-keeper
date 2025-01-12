import { usePermitlyStore } from "@/stores/PermitlyStore";

/**
 * Kullanıcının belirtilen izinlere sahip olup olmadığını kontrol eder
 * 
 * @param permissions - Kontrol edilecek izinlerin string dizisi
 * @returns {boolean} - Kullanıcının tüm gerekli izinlere sahip olup olmadığını belirten boolean değer
 */
export const isAuthorized = (permissions: string[]) => {
	const roles = usePermitlyStore((state) => state.roles);
	const user = usePermitlyStore((state) => state.user);

	if (roles.length === 0 || !user) return false;

	return permissions.every((permission) => user.roles.includes(permission));
};
