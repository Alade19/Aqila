import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    // "Content-Type": "application/json", //ALLOWS FORM DATA TO BE SENT
    "ngrok-skip-browser-warning": "true",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          error.message = "Bad Request, please try again";
          break;
        case 401:
          error.message =
            "Unauthorized access. Please provide valid credentials to continue";
          Cookies.remove("userToken");
          window.location.href = "/";
          break;
        case 403:
          error.message = "Forbidden, you don't have access";
          break;
        case 404:
          error.message = "Not found or bad request";
          break;
        case 409:
          error.message = "Email already exists";
          break;
        case 500:
          error.message = "Server error, please try again";
          break;
        default:
          error.message = "An unexpected error occurred, please try again";
      }
    } else if (error.request) {
      error.message = "Network error: please check your connection";
    } else {
      error.message = "An unexpected error occurred, please try again";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
