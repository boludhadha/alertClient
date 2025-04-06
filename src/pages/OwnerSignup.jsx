import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';


const OwnerSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    community_name: '',
    terms: false
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.terms) {
      setError("You must agree to the terms and conditions");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/owner/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if(response.ok) {
        // Redirect to dashboard passing the token from the unique link.
        const token = data.unique_link.split('token=')[1];
        navigate(`/owner/dashboard?token=${token}`);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Community Owner Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} required />

        <label>Community Name:</label>
        <input type="text" name="community_name" value={form.community_name} onChange={handleChange} required />

        <label>
          <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
          I agree to the terms and conditions
        </label>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default OwnerSignup;
