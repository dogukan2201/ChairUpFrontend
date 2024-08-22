import React, { useState, createContext, useContext } from "react";
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
const AuthContext = createContext<AuthContextType | null>(initialValues);

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };
  const userLogout = async () => {};
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
