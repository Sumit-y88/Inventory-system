import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          companyName
        }
      );

      alert("Registration successful");

      navigate("/");

    } catch (error) {

      alert(error.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Inventory System
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your account
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Company / Shop Name"
            className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-indigo-600 text-white p-3 w-full rounded hover:bg-indigo-700 transition"
          >
            Register
          </button>

        </form>

        {/* Login Link */}

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-2 text-indigo-600 font-semibold hover:underline"
          >
            Login
          </button>

        </div>

      </div>

    </div>

  );
}

export default Register;