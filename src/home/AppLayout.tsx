import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7ED]">
      <Header />
      <main className="flex-[0.8]  h-full flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
