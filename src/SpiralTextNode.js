import React from 'react';
import SpiralText from './SpiralText';

const radius = 20;
const fontSize = 16; // Font size in pixels
const density = 0.2; // Control the density of the spiral

const SpiralTextNode = ({ textData, texts, parentCoordinates }) => {
   // Calculate "center" of the spiral (this is a simplification)
   const centerX = parentCoordinates ? parentCoordinates.x : 0;
   const centerY = parentCoordinates ? parentCoordinates.y : 0;
 
   // Calculate new coordinates for this node
   const newCoordinates = { x: centerX + 60, y: centerY }; // Adjust calculation as needed
 
   const children = texts.filter(t => t.parent === textData.id);
 
   return (
     <div style={{ position: 'absolute', left: `${newCoordinates.x}px`, top: `${newCoordinates.y}px` }}>
      <SpiralText 
        id={textData.id} 
        text={textData.text} 
        radius={radius} 
        fontSize={fontSize} 
        density={density} 
        onCalculate={({ endPoint, direction }) => {
          console.log("Endpoint:", endPoint, "Direction:", direction);
        }}
        flip={textData.flip}
      />
      {children.map(child => (
        <SpiralTextNode key={child.id} textData={child} texts={texts} parentCoordinates={newCoordinates} />
      ))}
     </div>
   );
 };

export default SpiralTextNode;
