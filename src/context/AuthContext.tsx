import React, { useState, createContext, useEffect } from "react";
import type {
  UserDataType,
  ProviderProps,
  AuthContextType,
} from "./AuthContext.d";

import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

const initialValues = {
  user: null,
  role: null,
  customerLogin: () => Promise.resolve(),
  customerDelete: () => Promise.resolve(),
  adminLogin: () => Promise.resolve(),
  getAdmin: () => Promise.resolve(),
  getCustomer: () => Promise.resolve(),
  userLogout: () => Promise.resolve(),
  userSignUp: () => Promise.resolve(),
  userDelete: () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextType>(initialValues);

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
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

      if (response.data.accessToken) {
        router.push("/login");
      }
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
      router.push("/login/admin");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const adminLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/admins/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setRole(response.data.role);
        localStorage.setItem("role", response.data.role);
        router.push("/admin");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const getAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admins/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.admin) {
        setUser(response.data.admin);
      }
    } catch (error: unknown) {
      if ((error as AxiosError).response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      } else {
        console.error("Error fetching admin:", error);
      }
    }
  };

  const customerDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token is missing");
      }

      setLoading(true);
      const response = await axiosInstance.delete(
        `/api/admins/deleteCustomer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.error === false) {
        console.log("Customer Deleted Successfully");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const getCustomer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/customers/customer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.customer) {
        setUser(response.data.customer);
      }
    } catch (error: unknown) {
      if ((error as AxiosError).response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      } else {
        console.error("Error fetching customer:", error);
      }
    }
  };
  const customerLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/customers/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setRole(response.data.role);
        localStorage.setItem("role", response.data.role);
        router.push("/");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const contextValue = {
    user,
    role,
    userLogout,
    userSignUp,
    adminLogin,
    getAdmin,
    getCustomer,
    customerLogin,
    customerDelete,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
