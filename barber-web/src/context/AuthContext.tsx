import { createContext, ReactNode, useContext, useState } from "react";

import { destroyCookie } from "nookies";
import path from "path";
import router from "next/router";

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

  async function signin({ email, password }: SigninProps) {
    console.log({
      email,
      password,
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
