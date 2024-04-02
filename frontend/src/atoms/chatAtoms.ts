import { atom } from "jotai";
import { UserInitial } from "@type/userInitialValues";
import { User } from "@type/userTypes";

export const selectedUserAtom = atom<User>(UserInitial);

export const threadAtom = atom<number | null>(null);