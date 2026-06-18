import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export const getUser =
  () => {
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

    if (!cookie)
      return null;

    const token =
      cookie.split("=")[1];

    try {
      return jwtDecode<DecodedToken>(
        token
      );
    } catch {
      return null;
    }
  };