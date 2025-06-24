import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block"
          >
            LinkSaver
          </Link>
          <p className="text-amber-600 mt-2 text-sm">
            Your personal link organizer
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-200">
          <Outlet />
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-amber-600 hover:text-amber-800 text-sm font-medium hover:underline transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
