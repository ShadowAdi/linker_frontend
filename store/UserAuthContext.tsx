import  React,{
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { type UserType } from "../types/userType";
import { BASE_URL } from "../constants/baseUrl";

type UserContextType = {
  user: UserType | null;
  fetchUser: () => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  setToken: (token: string) => void;
  globalLoading: boolean;
  setGlobalLoading: (val: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [globalLoading, setGlobalLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setGlobalLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}user/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
        logout();
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUser,
        logout,
        getToken,
        setToken,
        globalLoading,
        setGlobalLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
