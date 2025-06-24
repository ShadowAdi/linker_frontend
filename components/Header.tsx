import { Link } from "react-router-dom";

const Header = () => {
  return (
   <header className="bg-amber-50 shadow-sm py-4 px-4 sm:px-6 lg:px-8">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-amber-800">
              LinkSaver
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-amber-700 border border-amber-700 rounded-md hover:bg-amber-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 transition"
              >
                Register
              </Link>
            </div>
          </nav>
        </header>
  );
};

export default Header;
