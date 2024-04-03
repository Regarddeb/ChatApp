import { atom } from "jotai";

export const searchChatHistoryActiveAtom = atom<boolean>(false);

export const userSearchActiveAtom = atom<boolean>(false);

export const currentTabAtom = atom<string>("chat_history");
