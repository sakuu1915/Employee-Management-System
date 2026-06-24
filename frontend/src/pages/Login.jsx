import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUsers,
} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        data.token
      );

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-lg bg-white/90 shadow-2xl rounded-3xl p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FiUsers
                size={40}
                className="text-blue-600"
              />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Login to Employee Management System
          </p>

          <form
            onSubmit={submitHandler}
            className="space-y-4"
          >
            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-4 text-gray-400" />

              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="email"
                className="w-full border border-gray-300 rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-4 text-gray-400" />

              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-white mt-6 text-sm">
          Employee Management System © 2026
        </p>
      </motion.div>
    </div>
  );
}

export default Login;