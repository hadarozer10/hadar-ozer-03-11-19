import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast("an unexpected error occurred");
  }
  if (expectedError) {
    toast(error.response.data);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get
};