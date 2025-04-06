import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const OwnerDashboard = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/owner/dashboard?token=${token}`);
        const data = await response.json();
        if(response.ok) {
          setDashboardData(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch dashboard data');
      }
    };

    if(token) {
      fetchDashboard();
    }
  }, [token]);

  if(error) return <p>{error}</p>;
  if(!dashboardData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Owner Dashboard</h2>
      <p>Subscriber Count: {dashboardData.subscriber_count}</p>
      <p>Affiliate Earnings: ${dashboardData.affiliate_earnings}</p>
      <p>Your unique AlertBySyncgram link: <a href={dashboardData.unique_link}>{dashboardData.unique_link}</a></p>
    </div>
  );
};

export default OwnerDashboard;
