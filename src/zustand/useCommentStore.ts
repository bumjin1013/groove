import {Comment} from "@/types/short";
import {create} from "zustand";

interface CommentStore {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments) => set({comments}),
  addComment: (comment) => set((state) => ({comments: [comment, ...state.comments]})),
}));
