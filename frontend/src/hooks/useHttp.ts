import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "@atoms/userAtoms";

const useHttp = () => {
  const [user] = useAtom(userAtom);
  const token = user.token;

  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: headers,
  });

  const getRequest = (url, onSuccess, onError, options = {}) => {
    return api
      .get(url, options)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  };

  const postRequest = (url, payload, onSuccess, onError, options = {}) => {
    return api
      .post(url, payload, options)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  };

  const patchRequest = (url, payload, onSuccess, onError, options = {}) => {
    return api
      .patch(url, payload, options)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  };

  const deleteRequest = (url, onSuccess, onError, options = {}) => {
    return api
      .delete(url, { ...options })
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  };

  return {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
  };
};

export default useHttp;
