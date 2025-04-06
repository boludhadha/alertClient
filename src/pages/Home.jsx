import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to AlertBySyncgram</h1>
      <p>Your all-in-one alert system for Telegram communities.</p>
      <Link to="/owner/signup">
        <button>Get Started as Community Owner</button>
      </Link>
      <br /><br />
      <Link to="/subscriber/signup">
        <button>Sign Up for Alerts</button>
      </Link>
    </div>
  );
};

export default Home;
