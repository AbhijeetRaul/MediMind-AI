import axios from "axios";

const getToken = () => {
  if (
    typeof window ===
    "undefined"
  )
    return null;

  const cookie =
    document.cookie
      .split("; ")
      .find((row) =>
        row.startsWith(
          "token="
        )
      );

  return cookie
    ? cookie.split("=")[1]
    : null;
};

export const api =
  axios.create({
    baseURL:
      "http://localhost:5000/api",
  });

api.interceptors.request.use(
  (config) => {
    const token =
      getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);