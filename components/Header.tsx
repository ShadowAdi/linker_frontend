import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../store/UserAuthContext";

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-amber-200 py-4 px-4 sm:px-6 lg:px-8 flex-[0.1]">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          LinkSaver
        </Link>

        <div className="flex items-center space-x-3 sm:space-x-4">
          {user ? (
            <>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-1.5 text-sm sm:text-base font-medium text-red-700 border-2 border-red-600 rounded-lg hover:bg-red-100 hover:border-red-700 transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 sm:px-6 py-1.5 text-sm sm:text-base font-medium text-amber-700 border-2 border-amber-600 rounded-lg hover:bg-amber-100 hover:border-amber-700 transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 sm:px-6 py-1.5 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
