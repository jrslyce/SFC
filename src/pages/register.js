import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { robots } from '../data/robots';

export default function Register({ loginUser }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [favoriteRobot, setFavoriteRobot] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // In a real app, this would make an API call to register the user
    // For demo purposes, we'll just create a mock user
    const user = {
      id: 1,
      username,
      credits: 1000,
      team: favoriteRobot ? parseInt(favoriteRobot, 10) : null,
      isAdmin: false
    };
    
    // Login the newly registered user
    loginUser(user);
    
    // Redirect to homepage
    router.push('/');
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Register</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Choose a username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Choose a password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm your password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="favoriteRobot">Favorite Robot (Optional)</label>
            <select 
              id="favoriteRobot" 
              value={favoriteRobot} 
              onChange={(e) => setFavoriteRobot(e.target.value)}
            >
              <option value="">Choose a robot</option>
              {robots.map(robot => (
                <option key={robot.id} value={robot.id}>
                  {robot.name}
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="auth-button">Register</button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link href="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
} 