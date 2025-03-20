import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ user }) => {
  const router = useRouter();
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">
          <span className="logo-text">ROBOT BATTLE ARENA</span>
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link href="/battles" className={router.pathname === '/battles' ? 'active' : ''}>
          Battles
        </Link>
        <Link href="/robots" className={router.pathname === '/robots' ? 'active' : ''}>
          Robots
        </Link>
        <Link href="/leaderboard" className={router.pathname === '/leaderboard' ? 'active' : ''}>
          Leaderboard
        </Link>
      </div>
      
      <div className="navbar-auth">
        {user ? (
          <div className="user-info">
            <span className="user-credits">{user.credits} Credits</span>
            <Link href="/profile" className="profile-link">
              {user.username}
            </Link>
            <button className="logout-button">Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link href="/login" className="login-button">
              Login
            </Link>
            <Link href="/register" className="register-button">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 