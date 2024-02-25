import { atom } from "jotai";

export const searchHistoryActiveAtom = atom<boolean>(false);

export const userSearchActiveAtom = atom<boolean>(false);

export const currentTabAtom = atom<string>("user_list");
