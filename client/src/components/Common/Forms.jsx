import React, { useState } from 'react';

const Forms = ({ formType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'login') {
      // Handle login logic here
      console.log('Login data:', { email: formData.email, password: formData.password });
    } else {
      // Handle signup logic here
      const fetchData = async()=>{
        const users=await axios.get("http://localhost:5000/users")
      }
      console.log('Signup data:', formData);
    }
  };

  return (
    <div>
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
        <button type="submit">{formType === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default Forms;
