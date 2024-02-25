import { atomWithStorage } from "jotai/utils";

interface User {
  token: string;
  username: string;
  email: string;
}

const initialUser: User = {
  token: "",
  username: "",
  email: "",
};

export const userAtom = atomWithStorage<User>("user", initialUser);
