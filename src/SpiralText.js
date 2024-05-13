import React from 'react';
import './SpiralText.css';  // Importing CSS into the JS file

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const getTextWidth = (text, font) => {

    // Set the font to be the same as your desired style
    context.font = font;

    // Measure the text
    const metrics = context.measureText(text);
    return metrics.width;
}

function calculateEndingAngle(L, startRadius, density) {
    const b = density;
    const r0 = startRadius;
    const sqrtTerm = Math.sqrt(1 + b * b);  // Calculate the square root term
    const expPart = (b * L) / (r0 * sqrtTerm) + 1;  // Calculate the expression inside the logarithm
    const theta2 = Math.log(expPart) / b;  // Calculate theta_2 using natural logarithm
    return theta2;
}

const SpiralText = ({ id, text, radius, fontSize, density, onCalculate, flip = 1}) => {
    const generateSpiralPath = (startRadius = 1, text, density = 0.1) => {
        let d = `M ${startRadius * flip} 0`;
        let angle = 0;    
        const textLength = getTextWidth(text, String(fontSize)+"px Arial");
        const offSet = 0;
        console.log("Text width:", textLength);
        //const textLength = text.length * fontSize * 0.3;
        const theta2 = calculateEndingAngle(textLength + offSet, startRadius, density);
        const angleStep = 0.01;
        let lastX = 0;
        let lastY = 0;

        const e = 2.71828
      
        for (let i = 0; i < theta2; i += angleStep) {
          angle += angleStep;
          let currentRadius = startRadius * e ** (angle * density)
          lastX = flip * currentRadius * Math.cos(angle);
          lastY = currentRadius * Math.sin(angle);
          d += ` L ${lastX.toFixed(2)} ${lastY.toFixed(2)}`;
        }
      
        // Calculate tangent direction
        const tangentAngle = angle + Math.PI / 2; // Perpendicular to the radius
        const tangentX = Math.cos(tangentAngle);
        const tangentY = Math.sin(tangentAngle);
      
        return { pathD: d, endPoint: { x: lastX, y: lastY }, direction: { x: tangentX, y: tangentY } };
      };

  let { pathD, endPoint, direction } = generateSpiralPath(radius, text, density);

  // Call the callback with the end point and direction if provided
  React.useEffect(() => {
    if (onCalculate) {
      onCalculate({ endPoint, direction });
    }
  }, [endPoint, direction, onCalculate]);

  return (
    <svg width="1600" height="1600" viewBox="-800 -800 1600 1600">
      <path id={'textpath' + id} d={pathD} fill="transparent" stroke="red" />
      <text className="text-style" style={{ fontSize: `${fontSize}px` }}>
        <textPath href={'#textpath' + id} startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default SpiralText;