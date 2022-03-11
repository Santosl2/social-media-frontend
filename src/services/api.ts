import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

import { LOGIN_REFRESH_TOKEN, LOGIN_TOKEN } from "@/constants/LOGIN";
import { signOut } from "@/contexts/AuthContext";

type FailedQueueProps = {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
};

type RefreshResponse = {
  refreshToken: string;
};

let isRefreshing = false;

export const api = axios.create({
  baseURL: process.env.NEXT_API_URL,
});

const errorsToIntercept = [400, 401];

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      const { status: errorType } = error.response.data;
      const { [LOGIN_REFRESH_TOKEN]: refreshToken } = parseCookies();

      if (errorsToIntercept.includes(status)) {
        if (status === 401) {
          if (errorType === "token.expired") {
            if (!isRefreshing) {
              isRefreshing = true;

              try {
                const {
                  data: { refreshToken: token },
                } = await api.post<RefreshResponse>("/refresh-token", {
                  refreshToken,
                });

                setCookie(undefined, LOGIN_TOKEN, token, {
                  maxAge: 60 * 60, // 1 hour
                  path: "/",
                });
              } catch {
                signOut();
                return Promise.reject();
              } finally {
                isRefreshing = false;
              }
            }
          } else {
            signOut();
          }
        }
      }
    }

    return error.response;
  }
);

const { [LOGIN_TOKEN]: token } = parseCookies();

if (token) {
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}
