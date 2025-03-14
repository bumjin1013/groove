import {Short} from "@/types/short";
import {create} from "zustand";

interface DummyStore {
  data: Short[];
  setData: (data: Short[]) => void;
}

export const useDummyStore = create<DummyStore>((set) => ({
  data: [],
  setData: (data) => set({data}),
}));
