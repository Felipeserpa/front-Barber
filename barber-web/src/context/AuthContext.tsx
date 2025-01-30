import { createContext, ReactNode, useContext, useState } from "react";

import { destroyCookie, setCookie } from "nookies";
import path from "path";
import router from "next/router";

//importando api para fazar as conexao
import { api } from "../services/apiClient";

interface AuthContextType {
  user: UserProps;
  isAuthenticated: boolean;
  signin: (credentials: SigninProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
  subscription: SubscriptionProps | null;
}
interface SubscriptionProps {
  id: string;
  status: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

interface SigninProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function signOut() {
  console.log("Erro logout");
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    router.push("/login");
  } catch (err) {
    console.log("Error ao sair");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  //executando a requisao de login
  async function signin({ email, password }: SigninProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const {
        id,
        name,
        email: userEmail,
        endereco,
        subscription,
      } = response.data;

      setCookie(undefined, "@barber.token", response.data.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days ge :
        path: "/",
      });

      setUser({
        id,
        name,
        email: userEmail,
        endereco,
        subscription,
      });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
