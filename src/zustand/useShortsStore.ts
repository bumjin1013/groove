import {Comment, Short} from "@/types/short";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {storage} from "@/utils/mmkv";
import {shortsData} from "@/constants/dummy";

interface ShortsStore {
  data: Short[];
  setData: (data: Short[]) => void;
  updateLike: (shortsId: string) => void;
  addComment: (arg: {shortsId: string; body: Comment}) => void;
}

export const useShortsStore = create<ShortsStore>()(
  persist(
    (set, get) => ({
      data: [],
      setData: (data) => set(() => ({data})),
      updateLike: (shortsId) =>
        set((state) => {
          console.log("👍 Toggling like for:", shortsId);

          return {
            data: state.data.map((item) => {
              if (item.id === shortsId) {
                console.log("🔄 Before:", item.isLiked, "Likes:", item.likes);
                const updatedItem = {
                  ...item,
                  isLiked: !item.isLiked,
                  likes: item.isLiked ? item.likes - 1 : item.likes + 1,
                };
                console.log("✅ After:", updatedItem.isLiked, "Likes:", updatedItem.likes);
                return updatedItem;
              }
              return item;
            }),
          };
        }),

      addComment: ({shortsId, body}) =>
        set((state) => {
          return {
            data: state.data.map((item) => {
              if (item.id === shortsId) {
                return {
                  ...item,
                  comments: [body, ...item.comments],
                };
              }
              return item;
            }),
          };
        }),
    }),
    {
      name: "shorts-store",
      storage: {
        getItem: (key) => {
          const value = storage.getString(key);

          return value ? JSON.parse(value) : shortsData;
        },
        setItem: (key, value) => {
          storage.set(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          storage.delete(key);
        },
      },
    },
  ),
);
