import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const userStore = create(
  persist(
    (set) => ({
      user: null,
      contracts: null, 
      setUser: (newUser) => set({ user: newUser }), 
      setContracts: (newContracts) => set({ contracts: newContracts })
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default userStore;
