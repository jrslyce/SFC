import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login({ loginUser }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll just create a mock user
    const user = {
      id: 1,
      username,
      credits: 1000,
      team: null,
      isAdmin: username.toLowerCase() === 'admin'
    };
    
    // Login the user
    loginUser(user);
    
    // Redirect to homepage
    router.push('/');
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="auth-button">Login</button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link href="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
} 