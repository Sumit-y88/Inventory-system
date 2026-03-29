import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Inventory System
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to manage your inventory
        </p>

        <form onSubmit={handleLogin}>

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
            Login
          </button>

        </form>

        {/* Register Section */}

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-2 text-indigo-600 font-semibold hover:underline"
          >
            Create an Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;