export interface UserDataType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
export interface UserListType {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface AuthContextType {
  user: UserDataType | null;
  role: string | null;
  customerLogin: (email: string, password: string) => Promise<void>;
  customerDelete: (id: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  getAdmin: () => void;
  getCustomer: () => void;
  userLogout: () => void;
  userSignUp: (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<void>;
  loading: boolean;
}
export interface ProviderProps {
  children: React.ReactNode;
}
