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
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/user");
      if (response.data && response.data.user) {
        setUser(response.data.user);
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
    return () => {};
  }, []);

  const userLogin = async (email: string, password: string) => {
    {
      contextHolder;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        await openNotificationWithIcon("success");
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
    password: string
  ) => {
    try {
      const response = await axiosInstance.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (!response.data || !response.data.accessToken) {
        console.log("Error:", response.data);
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        router.push("/");
      }
    } catch (error) {
      console.log("Error", error);
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
