import React, { useState } from 'react';

const BettingPanel = ({ robot1, robot2, robot1Odds, robot2Odds, user, onPlaceBet }) => {
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [betAmount, setBetAmount] = useState(100);
  const [error, setError] = useState('');
  
  const handleRobotSelect = (robotId) => {
    setSelectedRobot(robotId);
    setError('');
  };
  
  const handleAmountChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setBetAmount(amount);
    setError('');
  };
  
  const calculatePotentialWinnings = () => {
    if (!selectedRobot) return 0;
    
    const odds = selectedRobot === robot1.id ? robot1Odds : robot2Odds;
    const oddsValue = parseInt(odds, 10);
    
    if (oddsValue > 0) {
      // Positive odds (underdog): for every 100 credits bet, win [odds] credits
      return Math.round((betAmount / 100) * oddsValue);
    } else {
      // Negative odds (favorite): bet [odds] credits to win 100 credits
      return Math.round((betAmount / Math.abs(oddsValue)) * 100);
    }
  };
  
  const handlePlaceBet = () => {
    // Validate user is logged in
    if (!user) {
      setError('You must be logged in to place a bet');
      return;
    }
    
    // Validate robot selection
    if (!selectedRobot) {
      setError('Please select a robot to bet on');
      return;
    }
    
    // Validate bet amount
    if (betAmount < 10) {
      setError('Minimum bet is 10 credits');
      return;
    }
    
    if (betAmount > user.credits) {
      setError('You don\'t have enough credits for this bet');
      return;
    }
    
    // Calculate potential winnings
    const potentialWinnings = calculatePotentialWinnings();
    
    // Log for debugging
    console.log('Placing bet:', {
      userId: user.id,
      robotId: selectedRobot,
      amount: betAmount,
      potentialWinnings,
      odds: selectedRobot === robot1.id ? robot1Odds : robot2Odds
    });
    
    // Place the bet using the callback from props
    if (typeof onPlaceBet === 'function') {
      onPlaceBet({
        userId: user.id,
        robotId: selectedRobot,
        amount: betAmount,
        potentialWinnings,
        odds: selectedRobot === robot1.id ? robot1Odds : robot2Odds
      });
    } else {
      console.error('onPlaceBet is not a function');
    }
  };
  
  return (
    <div className="betting-panel">
      <h2>Place Your Bet</h2>
      
      {!user ? (
        <div className="login-prompt">
          <p>Please login or register to place bets</p>
        </div>
      ) : (
        <>
          <div className="betting-credits">
            <p>Your Credits: <span>{user.credits}</span></p>
          </div>
          
          <div className="robot-selection">
            <button 
              className={`robot-option ${selectedRobot === robot1.id ? 'selected' : ''}`}
              onClick={() => handleRobotSelect(robot1.id)}
            >
              <span className="robot-name">{robot1.name}</span>
              <span className="robot-odds">{robot1Odds}</span>
            </button>
            
            <button 
              className={`robot-option ${selectedRobot === robot2.id ? 'selected' : ''}`}
              onClick={() => handleRobotSelect(robot2.id)}
            >
              <span className="robot-name">{robot2.name}</span>
              <span className="robot-odds">{robot2Odds}</span>
            </button>
          </div>
          
          <div className="bet-amount">
            <label htmlFor="bet-amount">Bet Amount:</label>
            <input 
              type="number" 
              id="bet-amount" 
              min="10" 
              max={user.credits} 
              value={betAmount} 
              onChange={handleAmountChange} 
            />
          </div>
          
          {selectedRobot && (
            <div className="potential-winnings">
              <p>Potential Winnings: <span>{calculatePotentialWinnings()} credits</span></p>
            </div>
          )}
          
          {error && <div className="bet-error">{error}</div>}
          
          <button 
            className="place-bet-button" 
            onClick={handlePlaceBet}
          >
            Place Bet
          </button>
        </>
      )}
    </div>
  );
};

export default BettingPanel; 