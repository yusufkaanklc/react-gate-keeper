import type { IPermitlyRole } from "@/interfaces/IPermitlyRole";
import type { IPermitlyStore } from "@/interfaces/IPermitlyStore";
import type { IPermitlyUser } from "@/interfaces/IPermitlyUser";
import { create } from "zustand";

// Global durum yönetimi için Zustand store oluşturulması
export const usePermitlyStore = create<IPermitlyStore>((set) => ({
	// Kullanıcı rollerini tutan dizi
	roles: [],
	// Rolleri güncellemek için kullanılan fonksiyon
	setRoles: (roles: IPermitlyRole[]) => set({ roles }),
	// Mevcut kullanıcı bilgisi (giriş yapılmadığında null)
	user: null,
	// Kullanıcı bilgisini güncellemek için kullanılan fonksiyon
	setUser: (user: IPermitlyUser) => set({ user }),
}));
