import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-indigo-600">
            InventoryPro
          </h1>

          <div className="space-x-6 flex items-center">
            <a href="#" className="text-gray-700 hover:text-indigo-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Features</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>

            {/* Login Button */}
            <button onClick={()=>{
                navigate("/login")
            }} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
              Login
            </button>
          </div>

        </div>
      </nav>


      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        
        <h2 className="text-5xl font-bold mb-6">
          Inventory Management System
        </h2>

        <p className="text-lg max-w-2xl mx-auto mb-8">
          Manage products, monitor stock levels, and track your inventory
          efficiently with a powerful cloud-based system.
        </p>

        <div className="space-x-4">
          <button onClick={()=>{
                navigate("/register")
            }} className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Get Started
          </button>

          {/* Login Button */}
          <button onClick={()=>{
                navigate("/login")
            }} className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition">
            Login
          </button>
        </div>

      </section>


      {/* Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        
        <h3 className="text-3xl font-bold text-center mb-12">
          Key Features
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-3">
              📦 Product Management
            </h4>
            <p className="text-gray-600">
              Add, update, and delete products easily while managing detailed product information.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-3">
              📊 Stock Tracking
            </h4>
            <p className="text-gray-600">
              Monitor inventory levels in real time and get alerts for low stock.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-3">
              🔒 Secure Access
            </h4>
            <p className="text-gray-600">
              Secure login system with authentication to protect your data.
            </p>
          </div>

        </div>

      </section>


      {/* Call To Action */}
      <section className="bg-indigo-600 text-white text-center py-16">

        <h3 className="text-3xl font-bold mb-4">
          Start Managing Your Inventory Today
        </h3>

        <p className="mb-6">
          Keep your business organized and efficient with our inventory system.
        </p>

        <button onClick={()=>{
                navigate("/register")
            }} className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200">
          Register Now
        </button>

      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p>© 2026 InventoryPro. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;