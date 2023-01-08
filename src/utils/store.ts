import { Chat } from "@/types/store";

// todo: use backend DB
export const chatHistory: Chat[] = [];

export const setChat = (chat: Chat) => {
  chatHistory.push(chat);
};