import React from 'react';

const NomaiMatrix = ({ matrix }) => {
  const radius = 100; // Radius of the central circle
  const circleCircumference = 2 * Math.PI * radius;
  const textOffset = circleCircumference / 4; // Adjust this to place text around the circle

  return (
    <svg width="800" height="800" viewBox="0 0 800 800">
      <g transform="translate(400, 400)"> {/* Centering the group in the middle */}
        {/* Central circle */}
        <path
          id="central-circle"
          d={`M 0 -${radius} 
          A ${radius} ${radius} 0 1 1 0 ${radius} 
          A ${radius} ${radius} 0 1 1 0 -${radius}`}
          fill="transparent"
        />
        <text fill="black">
          <textPath href="#central-circle" startOffset={`0px`}> 
            {/* style={{ textAnchor: 'middle' }} */}
            {matrix[0]}
          </textPath>
        </text>

        {/* Branching paths */}
        {matrix.slice(1).map((text, i) => {
          // Calculate angle for even distribution along the upper half of the circle
          const angle = (Math.PI / (matrix.length - 1)) * i - Math.PI / 2;
          const startX = radius * Math.cos(angle);
          const startY = radius * Math.sin(angle);
          const controlX = startX + 100 * Math.cos(angle - Math.PI / 2); // Move control point perpendicular
          const controlY = startY + 100 * Math.sin(angle - Math.PI / 2);

          return (
            <React.Fragment key={i}>
              <path
                id={`branch-path-${i}`}
                d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${startX + 150 * Math.cos(angle - Math.PI / 2)} ${startY + 150 * Math.sin(angle - Math.PI / 2)}`}
                fill="transparent"
                stroke="none" // Ensure no visible line for the path
              />
              <text fill="black">
                <textPath href={`#branch-path-${i}`} startOffset="5%" style={{ textAnchor: 'start' }}>
                  {text}
                </textPath>
              </text>
            </React.Fragment>
          );
        })}
      </g>
    </svg>
  );
};

export default NomaiMatrix;
