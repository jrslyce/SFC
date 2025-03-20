import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { robots } from '../data/robots';

export default function Home() {
  // Initialize with fixed robots to avoid hydration mismatch
  const [featuredRobots, setFeaturedRobots] = useState([robots[0], robots[1]]);
  
  // Generate random robots on the client side only after hydration
  useEffect(() => {
    const getRandomRobots = () => {
      const shuffled = [...robots].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 2);
    };
    setFeaturedRobots(getRandomRobots());
  }, []);
  
  return (
    <div className="home-page">
      <div className="hero-section">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ROBOT BATTLE ARENA
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Epic 1v1 robot battles with dramatic Dragon Ball Z style narratives
        </motion.p>
        
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/battles" className="cta-button primary">
            Watch Battles
          </Link>
          <Link href="/robots" className="cta-button secondary">
            Meet the Robots
          </Link>
        </motion.div>
      </div>
      
      <div className="info-section">
        <div className="info-card">
          <h2>Epic Robot Battles</h2>
          <p>
            Eight unique robots battle in intense 1v1 matches determined by dice rolls.
            Each robot has its own fighting style, special abilities, and human backstory.
          </p>
        </div>
        
        <div className="info-card">
          <h2>Place Your Bets</h2>
          <p>
            Join a team, earn credits, and bet on battles to multiply your earnings.
            Study robot attributes and make strategic predictions to win big!
          </p>
        </div>
        
        <div className="info-card">
          <h2>Dramatic Narratives</h2>
          <p>
            Experience battles narrated in over-the-top Dragon Ball Z style,
            complete with inner monologues, dramatic pauses, and unexpected twists.
          </p>
        </div>
      </div>
      
      <div className="featured-battle">
        <h2>Featured Battle</h2>
        <div className="featured-robots">
          <div className="featured-robot">
            <h3>{featuredRobots[0].name}</h3>
            <p>Originally: {featuredRobots[0].originalName}</p>
            <p className="featured-ability">{featuredRobots[0].specialAbility.split('-')[0]}</p>
          </div>
          
          <div className="versus">VS</div>
          
          <div className="featured-robot">
            <h3>{featuredRobots[1].name}</h3>
            <p>Originally: {featuredRobots[1].originalName}</p>
            <p className="featured-ability">{featuredRobots[1].specialAbility.split('-')[0]}</p>
          </div>
        </div>
        
        <Link href={`/battles/${featuredRobots[0].id}/${featuredRobots[1].id}`} className="watch-battle-button">
          Watch This Battle!
        </Link>
      </div>
      
      <div className="fan-deaths">
        <h2>Fan Death Counter</h2>
        <p>Some fans attend matches hoping to be destroyed by robots.</p>
        <div className="death-counter">
          <span className="death-number">
            {/* Use a fixed number instead of random to avoid hydration errors */}
            8742
          </span>
          <span className="death-label">Glorious Deaths</span>
        </div>
        <p className="death-disclaimer">
          All fan deaths are voluntary and considered an honor in the Robot Battle Arena community.
        </p>
      </div>
    </div>
  );
} 