import { Link } from "react-router-dom";
import Header from "../components/Header";
function App() {
  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-6">
            Welcome to LinkSaver
          </h1>
          <p className="text-lg text-amber-800 mb-8 max-w-2xl mx-auto">
            Save, organize, and revisit your favorite links with ease. Get
            started by creating an account or logging in.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 text-base font-medium text-amber-700 border border-amber-700 rounded-md hover:bg-amber-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 text-base font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
