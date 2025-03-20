import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { robots } from '../data/robots';

const RobotsList = () => {
  return (
    <div className="robots-list">
      <h1>Meet the Robots</h1>
      <div className="robots-grid">
        {robots.map(robot => (
          <Link href={`/robots/${robot.id}`} key={robot.id} className="robot-card">
            <div className="robot-card-inner">
              <div className="robot-card-image">
                {robot.image && (
                  <Image 
                    src={robot.image} 
                    alt={robot.name} 
                    width={150} 
                    height={150} 
                    className="robot-thumbnail" 
                  />
                )}
              </div>
              <div className="robot-card-info">
                <h2>{robot.name}</h2>
                <p className="robot-card-original-name">Originally: {robot.originalName}</p>
                <div className="robot-card-attributes">
                  <div className="attribute-mini">
                    <span className="attribute-mini-label">STR</span>
                    <span className="attribute-mini-value">{robot.attributes.strength}</span>
                  </div>
                  <div className="attribute-mini">
                    <span className="attribute-mini-label">QCK</span>
                    <span className="attribute-mini-value">{robot.attributes.quickness}</span>
                  </div>
                  <div className="attribute-mini">
                    <span className="attribute-mini-label">CLV</span>
                    <span className="attribute-mini-value">{robot.attributes.cleverness}</span>
                  </div>
                  <div className="attribute-mini">
                    <span className="attribute-mini-label">LCK</span>
                    <span className="attribute-mini-value">{robot.attributes.luck}</span>
                  </div>
                  <div className="attribute-mini">
                    <span className="attribute-mini-label">ACC</span>
                    <span className="attribute-mini-value">{robot.attributes.accuracy}</span>
                  </div>
                </div>
                <p className="robot-card-speciality">
                  Special: {robot.specialAbility.split('-')[0]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RobotsList; 