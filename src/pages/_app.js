import '../styles/globals.css';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Mock user state (in a real app, this would be managed with context/state management)
  const [user, setUser] = useState(null);
  
  // Mock login functionality (for demo purposes)
  useEffect(() => {
    // Check if there's a user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  // Enhanced page props with user and auth functions
  const enhancedProps = {
    ...pageProps,
    user,
    loginUser,
    logoutUser,
  };
  
  return (
    <Layout user={user}>
      <Component {...enhancedProps} />
    </Layout>
  );
}

export default MyApp; 