import { userAtom } from "@atoms/userAtoms";
import { useAtom } from "jotai";

function getToken() {
  const [user] = useAtom(userAtom);
  return user.token;
}

export const getHeader = () => {
  const token = getToken();

  const headers: { Authorization: string } = {
    Authorization: `Bearer ${token}`,
  };

  return headers;
};
