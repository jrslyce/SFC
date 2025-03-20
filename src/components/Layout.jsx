import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children, user }) => {
  return (
    <>
      <Head>
        <title>Robot Battle Arena</title>
        <meta name="description" content="Text-based robot battles with Dragon Ball Z style narratives" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      
      <Navbar user={user} />
      
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>Robot Battle Arena &copy; {new Date().getFullYear()} | A text-based battle simulation</p>
        </div>
      </footer>
    </>
  );
};

export default Layout; 