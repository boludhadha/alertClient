import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import OwnerSignup from './pages/OwnerSignup.jsx';
import OwnerDashboard from './pages/OwnerDashboard.jsx';
import SubscriberSignup from './pages/SubscriberSignup.jsx';
import NotFound from './pages/NotFound.jsx';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/owner/signup" element={<OwnerSignup />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/subscriber/signup" element={<SubscriberSignup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
