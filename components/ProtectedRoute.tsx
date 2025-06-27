import { Navigate } from "react-router-dom";
import { useUser } from "../store/UserAuthContext";
import type { JSX } from "react";
import  { useEffect, useState } from "react";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, globalLoading, getToken } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    const localToken = getToken();
    setToken(localToken!);
  }, []);

  if (globalLoading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
