import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser) => set({ newUser }), // Pass newUser directly to set
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default userStore;
