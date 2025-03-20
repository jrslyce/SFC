import React, { useState } from 'react';
import Link from 'next/link';
import { robots } from '../../data/robots';
import { calculateOdds } from '../../utils/battleUtils';

export default function BattlesList({ isAdmin = false }) {
  const [robot1, setRobot1] = useState(1);
  const [robot2, setRobot2] = useState(2);
  
  // Get the robot data
  const selectedRobot1 = robots.find(r => r.id === robot1);
  const selectedRobot2 = robots.find(r => r.id === robot2);
  
  // Calculate odds
  const { robot1Odds, robot2Odds } = calculateOdds(selectedRobot1, selectedRobot2);
  
  // Handle robot selection change
  const handleRobot1Change = (e) => {
    const id = parseInt(e.target.value, 10);
    if (id !== robot2) {
      setRobot1(id);
    }
  };
  
  const handleRobot2Change = (e) => {
    const id = parseInt(e.target.value, 10);
    if (id !== robot1) {
      setRobot2(id);
    }
  };
  
  return (
    <div className="battles-page">
      <h1>Robot Battles</h1>
      
      <div className="battle-creator">
        <h2>Create Your Battle</h2>
        <div className="battle-form">
          <div className="form-group">
            <label htmlFor="robot1">Robot 1:</label>
            <select 
              id="robot1" 
              value={robot1} 
              onChange={handleRobot1Change}
            >
              {robots.map(robot => (
                <option 
                  key={robot.id} 
                  value={robot.id}
                  disabled={robot.id === robot2}
                >
                  {robot.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="versus-text">VS</div>
          
          <div className="form-group">
            <label htmlFor="robot2">Robot 2:</label>
            <select 
              id="robot2" 
              value={robot2} 
              onChange={handleRobot2Change}
            >
              {robots.map(robot => (
                <option 
                  key={robot.id} 
                  value={robot.id}
                  disabled={robot.id === robot1}
                >
                  {robot.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="odds-display">
          <div className="robot-odds">
            <span className="robot-name">{selectedRobot1.name}</span>
            <span className="odds-value">{robot1Odds}</span>
          </div>
          <div className="robot-odds">
            <span className="robot-name">{selectedRobot2.name}</span>
            <span className="odds-value">{robot2Odds}</span>
          </div>
        </div>
        
        <Link 
          href={`/battles/${robot1}/${robot2}`} 
          className="watch-battle-button"
        >
          Watch Battle!
        </Link>
      </div>
      
      {isAdmin && (
        <div className="admin-controls">
          <h2>Admin Controls</h2>
          <div className="random-battles">
            <button className="random-battle-button">
              Generate Random Matchup
            </button>
          </div>
        </div>
      )}
      
      {/* Recent battles would go here in a real implementation */}
      <div className="recent-battles">
        <h2>Recent Battles</h2>
        <p className="placeholder-text">No recent battles to display.</p>
      </div>
    </div>
  );
} 