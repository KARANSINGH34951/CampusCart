import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setuser } from "../../store/auth-slice";

const Forms = ({ formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        userName: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage("User registered successfully!");
      toast.success("Registration successful! Welcome!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
      toast.error(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage("Login successful!");
      dispatch(setuser(response.data));
      // toast.success('Login successful! Welcome back!');
      response.data.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/shop/home");
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
      toast.error(
        err.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === "signup") {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const handlenavigation = () => {
    formType === "signup" ? navigate("/login") : navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-6 shadow-lg rounded-lg">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        {formType === "login" ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit} className="w-[350px] space-y-4">
        {formType === "signup" && (
          <div>
            <label htmlFor="name" className="text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 mt-4 rounded-md text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading
            ? formType === "login"
              ? "Logging in..."
              : "Signing up..."
            : formType === "login"
            ? "Login"
            : "Sign Up"}
        </button>

        {formType === "signup" ? (
          <h2>
            Already have Account ?{" "}
            <button onClick={handlenavigation} className="text-blue-600">
              Login Now !
            </button>
          </h2>
        ) : (
          <h2>
            New to the CampusCart ?{" "}
            <button className="text-blue-600" onClick={handlenavigation}>
              Sign Up Now !
            </button>
          </h2>
        )}
      </form>
    </div>
  );
};

export default Forms;
