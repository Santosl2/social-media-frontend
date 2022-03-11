/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useToast } from "@chakra-ui/react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { LOGIN_REFRESH_TOKEN, LOGIN_TOKEN } from "@/constants";
import { User } from "@/interfaces";
import { api } from "@/services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
};

type FormResponse = {
  status: string;
  message: string;
  user: User;
  token: string;
  refreshToken: string;
};

export function signOut() {
  destroyCookie(undefined, LOGIN_TOKEN);
  destroyCookie(undefined, LOGIN_REFRESH_TOKEN);
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const toast = useToast();

  useEffect(() => {
    const { [LOGIN_TOKEN]: token } = parseCookies();

    if (token && token !== "undefined") {
      api.get<FormResponse>("/users").then((response) => {
        setUser(response.data.user);
      });
    }
  }, []);

  const createCookie = useCallback((token: string, refreshToken: string) => {
    setCookie(undefined, LOGIN_TOKEN, token, {
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    setCookie(undefined, LOGIN_REFRESH_TOKEN, refreshToken, {
      maxAge: 86400, // 1 day
    });

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, []);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      try {
        const response = await api.post<FormResponse>("sessions", {
          email,
          password,
        });

        const { data: responseData } = response;

        if (responseData.status === "error") {
          toast({
            title: "Oops, tivemos um pequeno error",
            description: responseData.message,
            status: "error",
            duration: 9000,
            variant: "left-accent",
            position: "bottom-left",
            isClosable: true,
          });

          return;
        }

        const { name } = responseData.user;
        toast({
          title: "Sucesso!",
          description: `Seja bem-vindo(a)  ${name}`,
          status: "success",
          duration: 9000,
          variant: "left-accent",
          position: "bottom-left",
          isClosable: true,
        });

        createCookie(response.data.token, response.data.refreshToken);

        setUser({
          email,
          name,
        });
      } catch {
        toast({
          title: "Oops, tivemos um pequeno error",
          description: "Erro interno no servidor",
          status: "error",
          duration: 9000,
          variant: "left-accent",
          position: "bottom-left",
          isClosable: true,
        });
      }
    },
    [createCookie, toast]
  );

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
