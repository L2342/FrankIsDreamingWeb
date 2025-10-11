import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api/client";

interface User {
  _id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Al iniciar, intenta cargar el usuario desde el token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    api.get("/users/profile")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    const res = await api.get("/users/profile");
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};