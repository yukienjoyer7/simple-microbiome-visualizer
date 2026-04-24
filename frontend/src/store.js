import { create } from 'zustand'

export const useStore = create((set) => ({
  // Data State
  microbiomeData: null,
  isLoading: false,
  
  // UI Controls State
  activeViz: 'pcoa', // Default visualisasi
  colorBy: 'target', // Default pengelompokan warna

  // Actions untuk mengubah state
  setData: (data) => set({ microbiomeData: data }),
  setLoading: (status) => set({ isLoading: status }),
  setActiveViz: (viz) => set({ activeViz: viz }),
  setColorBy: (category) => set({ colorBy: category }),
}))