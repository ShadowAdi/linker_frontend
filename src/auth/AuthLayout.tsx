import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex flex-col min-h-screen w-screen">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
