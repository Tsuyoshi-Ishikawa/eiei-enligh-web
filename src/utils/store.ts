import { Comment } from "@/types/store";

// todo: use backend DB
export const commentHistory: Comment[] = [];

export const setComment = (comment: Comment) => {
  commentHistory.push(comment);
};