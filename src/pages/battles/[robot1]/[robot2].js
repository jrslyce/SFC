import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BattleView from '../../../components/BattleView';
import BettingPanel from '../../../components/BettingPanel';
import { robots } from '../../../data/robots';
import { calculateOdds } from '../../../utils/battleUtils';

export default function BattlePage({ user, loginUser }) {
  const router = useRouter();
  const { robot1: robot1Id, robot2: robot2Id } = router.query;
  
  // Convert IDs to numbers
  const id1 = parseInt(robot1Id, 10);
  const id2 = parseInt(robot2Id, 10);
  
  // Fetch robot data
  const robot1 = robots.find(r => r.id === id1);
  const robot2 = robots.find(r => r.id === id2);
  
  // Calculate odds
  const { robot1Odds, robot2Odds } = calculateOdds(robot1 || robots[0], robot2 || robots[1]);
  
  // State for bet placement
  const [betPlaced, setBetPlaced] = useState(false);
  const [betInfo, setBetInfo] = useState(null);
  
  // Handle bet placement
  const handlePlaceBet = (bet) => {
    // In a real app, this would make an API call to save the bet
    console.log('Bet placed:', bet);
    
    // Update user's credits (mock implementation)
    if (user) {
      const updatedUser = {
        ...user,
        credits: user.credits - bet.amount
      };
      loginUser(updatedUser);
    }
    
    // Update the bet state
    setBetInfo(bet);
    setBetPlaced(true);
  };
  
  if (!robot1 || !robot2) {
    return (
      <div className="loading">
        <p>Loading battle...</p>
      </div>
    );
  }
  
  return (
    <div className="battle-page">
      <h1 className="battle-title">{robot1.name} vs {robot2.name}</h1>
      
      {!betPlaced && (
        <BettingPanel 
          robot1={robot1}
          robot2={robot2}
          robot1Odds={robot1Odds}
          robot2Odds={robot2Odds}
          user={user}
          onPlaceBet={handlePlaceBet}
        />
      )}
      
      {betPlaced && (
        <div className="bet-confirmation">
          <p>You bet {betInfo.amount} credits on {betInfo.robotId === robot1.id ? robot1.name : robot2.name}!</p>
          <p>Potential winnings: {betInfo.potentialWinnings} credits</p>
        </div>
      )}
      
      <BattleView 
        robotId1={id1}
        robotId2={id2}
        isAdmin={user && user.isAdmin}
      />
    </div>
  );
} 