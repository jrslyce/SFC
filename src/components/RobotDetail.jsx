import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RobotDetail = ({ robot }) => {
  if (!robot) return <div>Robot not found</div>;

  const renderAttributeBar = (value) => {
    return (
      <div className="attribute-bar">
        <div className="attribute-fill" style={{ width: `${(value / 10) * 100}%` }}></div>
      </div>
    );
  };

  return (
    <div className="robot-detail">
      <div className="robot-detail-header">
        <div className="robot-image-container">
          {robot.image && (
            <Image 
              src={robot.image} 
              alt={robot.name} 
              width={300} 
              height={300} 
              className="robot-image" 
            />
          )}
        </div>
        <div className="robot-info">
          <h1>{robot.name}</h1>
          <p className="original-name">Originally: {robot.originalName}</p>
          <div className="robot-attributes">
            <h3>Attributes</h3>
            <div className="attribute-grid">
              <div className="attribute">
                <span className="attribute-name">Strength</span>
                {renderAttributeBar(robot.attributes.strength)}
                <span className="attribute-value">{robot.attributes.strength}</span>
              </div>
              <div className="attribute">
                <span className="attribute-name">Quickness</span>
                {renderAttributeBar(robot.attributes.quickness)}
                <span className="attribute-value">{robot.attributes.quickness}</span>
              </div>
              <div className="attribute">
                <span className="attribute-name">Cleverness</span>
                {renderAttributeBar(robot.attributes.cleverness)}
                <span className="attribute-value">{robot.attributes.cleverness}</span>
              </div>
              <div className="attribute">
                <span className="attribute-name">Luck</span>
                {renderAttributeBar(robot.attributes.luck)}
                <span className="attribute-value">{robot.attributes.luck}</span>
              </div>
              <div className="attribute">
                <span className="attribute-name">Accuracy</span>
                {renderAttributeBar(robot.attributes.accuracy)}
                <span className="attribute-value">{robot.attributes.accuracy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="robot-backstory">
        <h2>Backstory</h2>
        <p>{robot.backstory}</p>
      </div>

      <div className="robot-abilities">
        <div className="fighting-style">
          <h3>Fighting Style</h3>
          <p>{robot.fightingStyle}</p>
        </div>
        <div className="special-ability">
          <h3>Special Ability</h3>
          <p>{robot.specialAbility}</p>
        </div>
      </div>

      <div className="robot-actions">
        <Link href="/battles" className="battle-button">
          Battle with {robot.name}
        </Link>
        <Link href="/robots" className="back-button">
          Back to Robots
        </Link>
      </div>
    </div>
  );
};

export default RobotDetail; 