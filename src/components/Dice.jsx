import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dice = ({ sides = 6, result, rolling, onRollComplete }) => {
  const [currentFace, setCurrentFace] = useState(1);
  const [rotations, setRotations] = useState(0);
  
  // Effect to handle the rolling animation
  useEffect(() => {
    if (rolling) {
      // Reset rotation count
      setRotations(0);
      
      // Start the rolling animation
      const rollInterval = setInterval(() => {
        // Show a random face during rolling
        setCurrentFace(Math.floor(Math.random() * sides) + 1);
        setRotations(prev => prev + 1);
        
        // After 10 rotations, show the result and stop
        if (rotations >= 10) {
          clearInterval(rollInterval);
          setCurrentFace(result);
          if (onRollComplete) onRollComplete();
        }
      }, 100);
      
      return () => clearInterval(rollInterval);
    } else if (result) {
      // When not rolling but result changes, update the face
      setCurrentFace(result);
    }
  }, [rolling, result, rotations, sides, onRollComplete]);
  
  // Generate dice pips based on the current face
  const renderPips = () => {
    switch (currentFace) {
      case 1:
        return (
          <div className="pip-container">
            <div className="pip center-pip"></div>
          </div>
        );
      case 2:
        return (
          <div className="pip-container">
            <div className="pip top-left-pip"></div>
            <div className="pip bottom-right-pip"></div>
          </div>
        );
      case 3:
        return (
          <div className="pip-container">
            <div className="pip top-left-pip"></div>
            <div className="pip center-pip"></div>
            <div className="pip bottom-right-pip"></div>
          </div>
        );
      case 4:
        return (
          <div className="pip-container">
            <div className="pip top-left-pip"></div>
            <div className="pip top-right-pip"></div>
            <div className="pip bottom-left-pip"></div>
            <div className="pip bottom-right-pip"></div>
          </div>
        );
      case 5:
        return (
          <div className="pip-container">
            <div className="pip top-left-pip"></div>
            <div className="pip top-right-pip"></div>
            <div className="pip center-pip"></div>
            <div className="pip bottom-left-pip"></div>
            <div className="pip bottom-right-pip"></div>
          </div>
        );
      case 6:
        return (
          <div className="pip-container">
            <div className="pip top-left-pip"></div>
            <div className="pip top-right-pip"></div>
            <div className="pip middle-left-pip"></div>
            <div className="pip middle-right-pip"></div>
            <div className="pip bottom-left-pip"></div>
            <div className="pip bottom-right-pip"></div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div 
      className="dice"
      animate={{ 
        rotateX: rolling ? [0, 360, 720, 1080] : 0,
        rotateY: rolling ? [0, 360, 720, 1080] : 0
      }}
      transition={{ 
        duration: rolling ? 1 : 0.3,
        ease: "easeInOut"
      }}
    >
      {renderPips()}
      {/* Display modifier if provided */}
      {result && result.modifier !== undefined && (
        <div className="modifier">
          {result.modifier >= 0 ? `+${result.modifier}` : result.modifier}
        </div>
      )}
    </motion.div>
  );
};

export default Dice; 