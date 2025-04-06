// client/src/pages/SubscriberSignup.jsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const SubscriberSignup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    token: token,
    payment_plan: 'Basic',
    terms: false
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [paymentURL, setPaymentURL] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms) {
      setError("You must agree to the terms and conditions");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/subscriber/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Signup successful! Please proceed to payment.');
        if (data.payment_url) {
          setPaymentURL(data.payment_url);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handlePayment = () => {
    if (paymentURL) {
      // Redirect the user to the payment URL (e.g., Paystack payment page)
      window.location.href = paymentURL;
    } else {
      setError('Payment URL not available');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Subscriber Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && (
        <div>
          <p style={{ color: 'green' }}>{message}</p>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      )}
      {!message && (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} required />

          <label>Payment Plan:</label>
          <select name="payment_plan" value={form.payment_plan} onChange={handleChange}>
            <option value="Basic">Basic - up to 60 calls/month ($18.99)</option>
            <option value="Standard">Standard - up to 100 calls/month ($29.99)</option>
          </select>

          <label>
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
            I agree to the terms and conditions
          </label>

          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default SubscriberSignup;
