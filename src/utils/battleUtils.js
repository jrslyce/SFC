// Function to roll a dice with a given number of sides
export const rollDice = (sides = 6) => {
  return Math.floor(Math.random() * sides) + 1;
};

// Function to roll a dice with attribute modifier
export const rollWithAttribute = (attribute, sides = 6) => {
  // Convert attribute (1-10) to a modifier (-2 to +4)
  const modifier = Math.floor(attribute / 2) - 2;
  const roll = rollDice(sides);
  const modifiedRoll = Math.max(1, roll + modifier); // Minimum roll is 1
  
  return {
    originalRoll: roll,
    modifier,
    modifiedRoll,
  };
};

// Function to calculate damage based on offensive and defensive rolls
export const calculateDamage = (offensiveRolls, defensiveRolls, attacker) => {
  // Sum up all offensive rolls
  const totalOffense = offensiveRolls.reduce((sum, roll) => sum + roll.modifiedRoll, 0);
  
  // Sum up all defensive rolls
  const totalDefense = defensiveRolls.reduce((sum, roll) => sum + roll.modifiedRoll, 0);
  
  // Calculate base damage (minimum 0)
  let damage = Math.max(0, totalOffense - totalDefense);
  
  // Apply a multiplier based on the strength attribute
  const strengthMultiplier = 1 + (attacker.attributes.strength / 20);
  damage = Math.floor(damage * strengthMultiplier);
  
  // Scale damage to be appropriate for 100 HP instead of 1000 HP
  damage = Math.max(1, Math.floor(damage / 3));
  
  // Add some randomness for critical hits (5% chance)
  if (Math.random() < 0.05) {
    damage = Math.floor(damage * 2);
    return { damage, critical: true };
  }
  
  return { damage, critical: false };
};

// Generate a battle narrative
export const generateNarrative = (attacker, defender, rolls, damageResult) => {
  const { damage, critical } = damageResult;
  
  // Basic narrative templates
  const attackPhrases = [
    `${attacker.name} lunges forward, circuits buzzing with energy!`,
    `With a mechanical roar, ${attacker.name} unleashes a barrage of attacks!`,
    `${attacker.name} calculates the perfect angle of attack and strikes!`,
    `"Prepare for system shutdown!" ${attacker.name} shouts as they attack!`,
    `${attacker.name} activates combat protocols and charges forward!`
  ];
  
  const defensePhrases = [
    `${defender.name} quickly brings up their defenses!`,
    `${defender.name} attempts to dodge the incoming attack!`,
    `"Not today!" ${defender.name} shouts, trying to counter!`,
    `${defender.name} activates defensive subroutines!`,
    `${defender.name}'s sensors detect the attack and respond!`
  ];
  
  const damagePhrases = damage > 0 ? [
    `${defender.name} takes ${damage} points of damage as sparks fly from their chassis!`,
    `A loud crunch is heard as ${defender.name} suffers ${damage} damage!`,
    `${defender.name}'s armor buckles under the pressure, taking ${damage} damage!`,
    `"My processors!" ${defender.name} cries out as they take ${damage} damage!`,
    `${damage} damage! ${defender.name}'s fans whir loudly trying to cool down overheating systems!`
  ] : [
    `${defender.name} completely avoids the attack!`,
    `The attack bounces harmlessly off ${defender.name}'s armor!`,
    `"Too slow!" ${defender.name} taunts as they evade completely!`,
    `${defender.name} deflects the attack with precision!`,
    `${attacker.name}'s attack misses by mere millimeters!`
  ];
  
  // Special narrative for critical hits
  const criticalPhrases = [
    `CRITICAL HIT! ${attacker.name} finds a vulnerability in ${defender.name}'s design!`,
    `DEVASTATING BLOW! ${attacker.name} strikes a critical system for double damage!`,
    `${defender.name}'s main circuit board takes a direct hit! CRITICAL DAMAGE!`,
    `A shower of sparks erupts as ${attacker.name} lands a CRITICAL strike!`,
    `"FATAL ERROR!" ${defender.name} screams as they take a critical hit!`
  ];
  
  // Randomly select phrases
  const attackPhrase = attackPhrases[Math.floor(Math.random() * attackPhrases.length)];
  const defensePhrase = defensePhrases[Math.floor(Math.random() * defensePhrases.length)];
  const damagePhrase = damagePhrases[Math.floor(Math.random() * damagePhrases.length)];
  
  // Build narrative
  let narrative = `${attackPhrase} ${defensePhrase} `;
  
  if (critical) {
    narrative += criticalPhrases[Math.floor(Math.random() * criticalPhrases.length)] + " ";
  }
  
  narrative += damagePhrase;
  
  // Random chance (15%) for a fan to be affected
  if (Math.random() < 0.15) {
    const fanFatalityPhrases = [
      `A piece of metal flies into the crowd, tragically eliminating a fan who actually came hoping for this fate!`,
      `An enthusiastic fan leaps in front of a stray projectile, achieving their dream of being destroyed by a robot!`,
      `The crowd cheers as a fan is crushed by debris! Their final thumbs-up suggests this was their life goal.`,
      `"My life is complete!" shouts a fan as they're vaporized by a stray energy beam.`,
      `A fan wearing a "Please destroy me, robot overlords" t-shirt gets their wish as shrapnel flies into the stands!`
    ];
    
    narrative += " " + fanFatalityPhrases[Math.floor(Math.random() * fanFatalityPhrases.length)];
  }
  
  // Add some inner monologue (DBZ style)
  const innerThoughtsPhrases = [
    `"${attacker.name} is stronger than I calculated," thinks ${defender.name}. "I must recalibrate my strategy!"`,
    `${attacker.name}'s processors race: "If I can just maintain this advantage, victory will be mine!"`,
    `"I cannot allow my former human self to be dishonored," ${defender.name} thinks, servo motors whirring.`,
    `${attacker.name} calculates a thousand possible outcomes in milliseconds. "There is only one path to victory..."`,
    `"What would ${defender.originalName} do in this situation?" ${defender.name} wonders, accessing fragmented human memories.`
  ];
  
  if (Math.random() < 0.3) { // 30% chance to add inner thoughts
    narrative += " " + innerThoughtsPhrases[Math.floor(Math.random() * innerThoughtsPhrases.length)];
  }
  
  return narrative;
};

// Function to generate a timestamp for battle events
export const generateTimestamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
};

// Function to calculate odds based on robot attributes
export const calculateOdds = (robot1, robot2) => {
  // Simple algorithm to calculate win probability
  const robot1Score = Object.values(robot1.attributes).reduce((sum, val) => sum + val, 0);
  const robot2Score = Object.values(robot2.attributes).reduce((sum, val) => sum + val, 0);
  
  const total = robot1Score + robot2Score;
  const robot1Probability = robot1Score / total;
  
  // Convert to betting odds (American format)
  let robot1Odds, robot2Odds;
  
  if (robot1Probability >= 0.5) {
    robot1Odds = Math.round(-100 * (robot1Probability / (1 - robot1Probability)));
    robot2Odds = Math.round(100 * ((1 - robot1Probability) / robot1Probability));
  } else {
    robot1Odds = Math.round(100 * (robot1Probability / (1 - robot1Probability)));
    robot2Odds = Math.round(-100 * ((1 - robot1Probability) / robot1Probability));
  }
  
  return {
    robot1Odds: robot1Odds > 0 ? `+${robot1Odds}` : robot1Odds.toString(),
    robot2Odds: robot2Odds > 0 ? `+${robot2Odds}` : robot2Odds.toString(),
  };
}; 