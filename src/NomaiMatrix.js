import React from 'react';

const NomaiMatrix = ({ matrix }) => {
  const radius = 30; // Initial radius for the circle
  const text = matrix[0]; // Assuming the first item is the text to display
  const fontSize = 16; // Font size in pixels
  const textLength = text.length * fontSize * 0.6; // Approx. length of text in pixels
  const circumference = 2 * Math.PI * radius;
  const spiralDensity = 10; // Control the density of the spiral

  // Function to generate spiral path
  const generateSpiralPath = (startRadius, length, density) => {
    let d = `M ${startRadius} 0`; // Start at (radius, 0)
    let angle = 0; // Initial angle
    const totalRotations = length / circumference; // Total rotations based on text length
    const angleStep = 0.1; // Smaller values give smoother spiral
    const radiusIncreasePerRotation = (fontSize * density) / (2 * Math.PI); // Adjusted formula

    for (let i = 0; i < totalRotations * 2 * Math.PI; i += angleStep) {
      angle += angleStep;
      const x = (startRadius + radiusIncreasePerRotation * angle) * Math.cos(angle);
      const y = (startRadius + radiusIncreasePerRotation * angle) * Math.sin(angle);
      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  };

  const pathD = textLength > circumference ?
                generateSpiralPath(radius, textLength, spiralDensity) :
                `M 0 -${radius} A ${radius} ${radius} 0 1 1 0 ${radius} A ${radius} ${radius} 0 1 1 0 -${radius}`;

  return (
    <svg width="800" height="800" viewBox="-400 -400 800 800">
      <path id="text-path" d={pathD} fill="transparent" stroke="red" />
      <text>
        <textPath href="#text-path" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default NomaiMatrix;
