import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#007BFF', color: '#fff', padding: '10px 20px' }}>
      <h1>AlertBySyncgram</h1>
      <nav>
        <Link to="/" style={{ color: '#fff', marginRight: '10px' }}>Home</Link>
        <Link to="/owner/signup" style={{ color: '#fff', marginRight: '10px' }}>Owner Signup</Link>
        <Link to="/subscriber/signup" style={{ color: '#fff', marginRight: '10px' }}>Subscriber Signup</Link>
      </nav>
    </header>
  );
};

export default Header;
