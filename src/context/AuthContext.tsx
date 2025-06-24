"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import api from "../utils/axios";

type AuthInput = {
  email: string;
  password: string;
};

interface User { id: string; email: string; role: string; is_superuser: boolean; }
interface AuthContextData {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (data: AuthInput) => {
    const formData = new URLSearchParams();
    formData.append("username", data.email);
    formData.append("password", data.password);

    const res = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString(),
    });

    if (!res.ok) throw new Error("Login failed");
    const json = await res.json();
    Cookies.set("token", json.access_token);
    fetchUser();
  };

  const fetchUser = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      Cookies.remove("token");
      setUser(null);
    }
  };


  const signup = async (email: string, password: string) => {
    const res = await api.post("/signup", { email, password });
    Cookies.set("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    window.location.href = "/"; 
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
