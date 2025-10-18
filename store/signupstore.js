import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Custom storage with expiration
const createStorageWithExpiry = () => {
  return {
    getItem: (name) => {
      const item = localStorage.getItem(name);
      if (!item) return null;

      try {
        const { value, expiry } = JSON.parse(item);
        
        // Check if expired
        if (expiry && Date.now() > expiry) {
          localStorage.removeItem(name);
          return null;
        }
        
        return value;
      } catch {
        return item;
      }
    },
    setItem: (name, value) => {
      const expiry = Date.now() + 24 * 60 * 60 * 1000; // 1 day in milliseconds
      const item = {
        value,
        expiry,
      };
      localStorage.setItem(name, JSON.stringify(item));
    },
    removeItem: (name) => {
      localStorage.removeItem(name);
    },
  };
};

const useSignupStore = create(
  persist(
    (set, get) => ({
      // State
      email: "",
      name: "",
      isVerified: false,

      // Actions
      setEmail: (email) => set({ email }),

      setName: (name) => set({ name }),

      setSignupData: (data) =>
        set({
          email: data.email || "",
          name: data.name || "",
        }),

      setVerified: (status) => set({ isVerified: status }),

      clearSignupData: () =>
        set({
          email: "",
          name: "",
          isVerified: false,
        }),

      // Getters
      getEmail: () => get().email,
      getName: () => get().name,
      getIsVerified: () => get().isVerified,
    }),
    {
      name: "signup-storage", // unique name for localStorage key
      storage: createJSONStorage(() => createStorageWithExpiry()),
      partialize: (state) => ({
        email: state.email,
        name: state.name,
        isVerified: state.isVerified,
      }), // specify which state to persist
    }
  )
);

export default useSignupStore;