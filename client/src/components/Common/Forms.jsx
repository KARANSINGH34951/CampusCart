import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setuser } from '../../store/auth-slice';


const Forms = ({ formType }) => {
  const dispatch=useDispatch()
  // const notify = () => formType=='signup' ? toast("Successfully signUp") :toast("Successfully Login");

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
      const response = await axios.post("http://localhost:3000/auth/register",{
        userName: formData.name,
        email: formData.email,
        password: formData.password
      })
      setSuccessMessage('User registered successfully!');
      
      // notify();

      toast.success("register successfully !")
      navigate("/login")

    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred.');
      console.error(err);
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
        password: formData.password
      });
      // notify();
      // console.log(response.data.userName);
      setSuccessMessage('Login successful!');
      dispatch(setuser(response.data))
      toast.success("Login successful!");

      response.data.role==="admin" ? navigate("/admin/dashboard"):navigate("/shop/home")
      
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'signup') {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>{formType === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {formType === 'signup' && (
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? (formType === 'login' ? 'Logging in...' : 'Signing up...') : formType === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Forms;
