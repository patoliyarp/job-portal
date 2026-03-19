import {
  createContext,
  useContext,
  type SetStateAction,
  type Dispatch,
} from "react";

export interface AuthType {
  userEmail: string | null;
  setUserEmail: Dispatch<SetStateAction<string | null>>;
  isLogin: boolean;
}

export const AuthContext = createContext<AuthType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("please wrap AuthProvider to use its value");
  }
  return context;
}
