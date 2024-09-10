import React, { useState, createContext, useEffect } from "react";
import { notification } from "antd/lib";
import type {
  UserDataType,
  ProviderProps,
  AuthContextType,
} from "./AuthContext.d";
type NotificationType = "success" | "info" | "warning" | "error";

import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

const initialValues = {
  user: null,
  loading: false,
  userLogin: () => Promise.resolve(),
  userLogout: () => Promise.resolve(),
  userSignUp: () => Promise.resolve(),
  getUser: () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextType>(initialValues);

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/api/customers/customer");
      if (response.data && response.data.customer) {
        setUser(response.data.customer);
      }
    } catch (error: unknown) {
      if ((error as AxiosError).response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const userLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/customers/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        router.push("/");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const userSignUp = async (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/customers/signup", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });

      if (!response.data || !response.data.accessToken) {
        console.log("Error:", response.data);
        return;
      }

      localStorage.setItem("token", response.data.accessToken);
      router.push("/");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = async () => {
    try {
      setLoading(true);
      localStorage.clear();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    userLogin,
    userLogout,
    userSignUp,
    loading,
    getUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
