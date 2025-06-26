import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import { useUser } from "../../store/UserAuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();
  const { setToken, fetchUser } = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(`${BASE_URL}user/login/`, formData);
    const data = await response.data;
    console.log("data ", data);
    if (data.success) {
      toast(data.message);
      setToken(data.token);
      await fetchUser();
      navigate("/home");
    } else {
      toast(data.message);
      console.log(data?.error);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">Welcome Back</h2>
        <p className="text-amber-600">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-amber-800 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-300 bg-white/50 backdrop-blur-sm"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-amber-800 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-300 bg-white/50 backdrop-blur-sm"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 cursor-pointer px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 focus:ring-4 focus:ring-amber-300 transition-all duration-300 hover:scale-[1.02] shadow-lg"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-amber-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-amber-600 hover:text-amber-800 hover:underline transition-colors duration-300"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
