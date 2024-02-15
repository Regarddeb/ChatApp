import { atom } from "jotai";

export const searchHistoryActiveAtom = atom<boolean>(false);
export const currentTabAtom = atom<string>("chat_history");
