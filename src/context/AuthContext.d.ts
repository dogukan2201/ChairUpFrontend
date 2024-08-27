export interface UserDataType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: UserDataType | null;
  userLogin: (email: string, password: string) => Promise<void>;
  userLogout: () => void;
  userSignUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  loading: boolean;
  getUser: () => void;
}
export interface ProviderProps {
  children: React.ReactNode;
}
