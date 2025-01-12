import type { IGKRole } from "@/interfaces/IGKRole";
import type { IGKStore } from "@/interfaces/IGKStore";
import type { IGKUser } from "@/interfaces/IGKUser";
import { create } from "zustand";

// Global durum yönetimi için Zustand store oluşturulması
export const useGKStore = create<IGKStore>((set) => ({
	// Kullanıcı rollerini tutan dizi
	roles: [],
	// Rolleri güncellemek için kullanılan fonksiyon
	setRoles: (roles: IGKRole[]) => set({ roles }),
	// Mevcut kullanıcı bilgisi (giriş yapılmadığında null)
	user: null,
	// Kullanıcı bilgisini güncellemek için kullanılan fonksiyon
	setUser: (user: IGKUser) => set({ user }),
}));
