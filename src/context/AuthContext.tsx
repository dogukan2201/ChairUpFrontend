import React, { useState, createContext, useEffect } from "react";
import type {
  UserDataType,
  ProviderProps,
  AuthContextType,
} from "./AuthContext.d";
const initialValues = {
  user: null,
  loading: false,
  userLogin: () => Promise.resolve(),
  userLogout: () => Promise.resolve(),
  userSignUp: () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextType>(initialValues);

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    } else {
      console.log("User data not found in local storage");
    }
  }, []);

  const userLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const simulatedUser: UserDataType = {
        firstName: "John",
        lastName: "Doe",
        email: email,
        password: password,
      };
      setUser(simulatedUser);
      localStorage.setItem("user", JSON.stringify(simulatedUser));
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };
  const userLogout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("user");
      setUser(null);
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
      setLoading(true);
      const simulatedUser: UserDataType = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      localStorage.setItem("user", JSON.stringify(simulatedUser));
      setUser(simulatedUser);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = { user, userLogin, userLogout, userSignUp, loading };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
