import { atomWithStorage } from "jotai/utils";

interface User {
  token: string;
  username: string;
  email: string;
}

// The initial value for the user atom
const initialUser: User = {
  token: "",
  username: "",
  email: "",
};

// Declare the user atom with storage
export const userAtom = atomWithStorage<User>("user", initialUser);
