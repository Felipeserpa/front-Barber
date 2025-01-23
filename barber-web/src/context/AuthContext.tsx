import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: UserProps;
  isAuthenticated: boolean;
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

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
