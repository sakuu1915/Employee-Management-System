import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUsers,
} from "react-icons/fi";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-500 via-emerald-600 to-teal-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <FiUsers
                size={40}
                className="text-green-600"
              />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Register to Employee Management System
          </p>

          <form
            onSubmit={submitHandler}
            className="space-y-4"
          >
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Enter Full Name"
                autoComplete="name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-4 text-gray-400" />

              <input
                type="email"
                placeholder="Enter Email"
                 autoComplete="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-4 text-gray-400" />

              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?
              <Link
                to="/"
                className="text-green-600 font-semibold ml-2 hover:underline"
              >
                Login
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

export default Register;