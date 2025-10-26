import { create } from "zustand";

interface ISettingStore {
  showSubmit: boolean;
  setShowSubmit: (value: boolean) => void;
}

export const useSettingsStore = create<ISettingStore>((set) => ({
  showSubmit: false,
  setShowSubmit: (value) => set({ showSubmit: value }),
}));
