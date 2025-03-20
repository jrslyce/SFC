import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Dice from './Dice';
import { robots } from '../data/robots';
import { rollWithAttribute, calculateDamage, generateNarrative, generateTimestamp, calculateOdds } from '../utils/battleUtils';

const BattleView = ({ robotId1, robotId2, isAdmin = false }) => {
  // Get robot data
  const robot1 = robots.find(r => r.id === robotId1) || robots[0];
  const robot2 = robots.find(r => r.id === robotId2) || robots[1];
  
  // Battle state
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleLog, setBattleLog] = useState([]);
  const [robot1HP, setRobot1HP] = useState(100);
  const [robot2HP, setRobot2HP] = useState(100);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [battleEnded, setBattleEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  
  // Dice state
  const [diceRolling, setDiceRolling] = useState(false);
  const [offensiveRolls, setOffensiveRolls] = useState([]);
  const [defensiveRolls, setDefensiveRolls] = useState([]);
  
  // Calculate betting odds
  const { robot1Odds, robot2Odds } = calculateOdds(robot1, robot2);
  
  // Reference for the battle log element
  const battleLogRef = useRef(null);
  
  // Scroll to the top of the battle log when new entries are added
  useEffect(() => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = 0;
    }
  }, [battleLog]);
  
  // Start battle
  const startBattle = () => {
    setBattleStarted(true);
    setBattleLog([{
      timestamp: generateTimestamp(),
      text: "Match starts!",
      robot1HP: 100,
      robot2HP: 100
    }]);
    // Determine who goes first (based on quickness)
    setCurrentTurn(robot1.attributes.quickness >= robot2.attributes.quickness ? 1 : 2);
  };
  
  // Process turn
  const processTurn = () => {
    if (battleEnded) return;
    
    const attacker = currentTurn === 1 ? robot1 : robot2;
    const defender = currentTurn === 1 ? robot2 : robot1;
    
    // Roll dice for attack
    setDiceRolling(true);
    
    // Reset previous rolls
    setOffensiveRolls([]);
    setDefensiveRolls([]);
    
    // Roll offensive dice (affected by attacker's attributes)
    const offRoll1 = rollWithAttribute(attacker.attributes.accuracy);
    const offRoll2 = rollWithAttribute(attacker.attributes.strength);
    
    // Roll defensive dice (affected by defender's attributes)
    const defRoll1 = rollWithAttribute(defender.attributes.quickness);
    const defRoll2 = rollWithAttribute(defender.attributes.cleverness);
    
    // Update dice rolls
    setOffensiveRolls([offRoll1, offRoll2]);
    setDefensiveRolls([defRoll1, defRoll2]);
    
    // Calculate damage
    const damageResult = calculateDamage([offRoll1, offRoll2], [defRoll1, defRoll2], attacker);
    
    // Generate narrative
    const narrative = generateNarrative(attacker, defender, 
      {offensive: [offRoll1, offRoll2], defensive: [defRoll1, defRoll2]}, 
      damageResult);
    
    // Set timeout to allow dice animation to complete
    setTimeout(() => {
      setDiceRolling(false);
      
      // Update health points
      let newDefenderHP;
      if (currentTurn === 1) {
        newDefenderHP = Math.max(0, robot2HP - damageResult.damage);
        setRobot2HP(newDefenderHP);
      } else {
        newDefenderHP = Math.max(0, robot1HP - damageResult.damage);
        setRobot1HP(newDefenderHP);
      }
      
      // Add to battle log
      setBattleLog(prev => [...prev, {
        timestamp: generateTimestamp(),
        text: narrative,
        robot1HP: currentTurn === 2 ? newDefenderHP : robot1HP,
        robot2HP: currentTurn === 1 ? newDefenderHP : robot2HP,
        attacker: attacker.name,
        defender: defender.name,
        damage: damageResult.damage,
        critical: damageResult.critical
      }]);
      
      // Check for battle end
      if (newDefenderHP <= 0) {
        setBattleEnded(true);
        setWinner(attacker);
      } else {
        // Switch turns
        setCurrentTurn(currentTurn === 1 ? 2 : 1);
      }
    }, 1500); // Dice animation duration
  };
  
  // Auto-process turns if battle is ongoing
  useEffect(() => {
    if (battleStarted && !battleEnded && !diceRolling) {
      const timer = setTimeout(() => {
        processTurn();
      }, 2000); // Delay between turns
      
      return () => clearTimeout(timer);
    }
  }, [battleStarted, currentTurn, diceRolling, battleEnded]);
  
  // Restart battle (admin only)
  const restartBattle = () => {
    if (!isAdmin) return;
    
    setBattleStarted(false);
    setBattleLog([]);
    setRobot1HP(100);
    setRobot2HP(100);
    setCurrentTurn(0);
    setBattleEnded(false);
    setWinner(null);
    setDiceRolling(false);
    setOffensiveRolls([]);
    setDefensiveRolls([]);
  };
  
  return (
    <div className="battle-container">
      {/* Section 1: Robot info and health */}
      <div className="section-1">
        <div className="robot-display">
          <h2>{robot1.name}</h2>
          <div className="robot-image-container">
            {robot1.image && (
              <Image 
                src={robot1.image} 
                alt={robot1.name} 
                width={200} 
                height={200} 
                className="robot-image" 
              />
            )}
          </div>
          <div className="hit-points">{robot1HP}</div>
          <div className="hit-points-label">Hit Points</div>
          <div className="odds-display">Odds {robot1Odds}</div>
        </div>
        
        <div className="robot-display">
          <h2>{robot2.name}</h2>
          <div className="robot-image-container">
            {robot2.image && (
              <Image 
                src={robot2.image} 
                alt={robot2.name} 
                width={200} 
                height={200} 
                className="robot-image" 
              />
            )}
          </div>
          <div className="hit-points">{robot2HP}</div>
          <div className="hit-points-label">Hit Points</div>
          <div className="odds-display">Odds {robot2Odds}</div>
        </div>
      </div>
      
      {/* Dice display section */}
      {battleStarted && (
        <div className="dice-section">
          <div className="dice-container">
            <h3>{currentTurn === 1 ? `${robot1.name}'s Attack` : `${robot2.name}'s Attack`}</h3>
            <div className="dice-row">
              <Dice 
                result={offensiveRolls[0]?.originalRoll || 1} 
                rolling={diceRolling} 
              />
              <Dice 
                result={offensiveRolls[1]?.originalRoll || 1} 
                rolling={diceRolling} 
              />
            </div>
            {offensiveRolls.length > 0 && !diceRolling && (
              <div className="dice-modifiers">
                <span>Modifiers: {offensiveRolls[0].modifier >= 0 ? '+' : ''}{offensiveRolls[0].modifier}, 
                {offensiveRolls[1].modifier >= 0 ? '+' : ''}{offensiveRolls[1].modifier}</span>
              </div>
            )}
          </div>
          
          <div className="dice-container">
            <h3>{currentTurn === 1 ? `${robot2.name}'s Defense` : `${robot1.name}'s Defense`}</h3>
            <div className="dice-row">
              <Dice 
                result={defensiveRolls[0]?.originalRoll || 1} 
                rolling={diceRolling} 
              />
              <Dice 
                result={defensiveRolls[1]?.originalRoll || 1} 
                rolling={diceRolling} 
              />
            </div>
            {defensiveRolls.length > 0 && !diceRolling && (
              <div className="dice-modifiers">
                <span>Modifiers: {defensiveRolls[0].modifier >= 0 ? '+' : ''}{defensiveRolls[0].modifier}, 
                {defensiveRolls[1].modifier >= 0 ? '+' : ''}{defensiveRolls[1].modifier}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Section 2: Battle log */}
      <div className="section-2">
        <div className="battle-log" ref={battleLogRef}>
          {battleLog.slice().reverse().map((entry, index) => (
            <div key={index} className="battle-entry">
              <div className="battle-timestamp">{entry.timestamp}</div>
              <div className="battle-text">{entry.text}</div>
              <div className="hp-display">
                <span>{entry.robot1HP} HP</span>
                <span>{entry.robot2HP} HP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Battle controls */}
      <div className="battle-controls">
        {!battleStarted && (
          <button className="start-button" onClick={startBattle}>
            Start Battle
          </button>
        )}
        
        {battleEnded && isAdmin && (
          <button className="restart-button" onClick={restartBattle}>
            Restart Battle
          </button>
        )}
        
        {battleEnded && (
          <div className="winner-announcement">
            <h2>{winner?.name} wins the battle!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleView; 