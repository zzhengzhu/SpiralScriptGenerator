import React, { useState } from "react";
import SpiralText from "./SpiralText";

const SpiralTextNode = ({ textData }) => {
  // Initialize state based on parentCoordinates or default to an offset position
  const [position, setPosition] = useState({
    x: textData.x ? textData.x : 0,
    y: textData.y ? textData.y : 0,
  });

  const handleMouseDown = (event) => {
    event.preventDefault(); // Prevent default to avoid dragging images or selections

    const svg = document.querySelector('svgroot' + textData.id);; // This should be the clicked SVG element

    // Convert the screen coordinates to the local SVG coordinate system
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const startPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

    // Attach mousemove and mouseup handlers to the window to handle dragging out of bounds
    const handleMouseMove = (moveEvent) => {
      const ptMove = svg.createSVGPoint();
      ptMove.x = moveEvent.clientX;
      ptMove.y = moveEvent.clientY;
      const movePoint = ptMove.matrixTransform(svg.getScreenCTM().inverse());

      setPosition({
        x: position.x + (movePoint.x - startPoint.x),
        y: position.y + (movePoint.y - startPoint.y),
      });
      startPoint.x = movePoint.x; // Update start point for the next move
      startPoint.y = movePoint.y;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      id={textData.id}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <SpiralText
        id={textData.id}
        text={textData.text}
        radius={20}
        fontSize={16}
        density={textData.density}
        flip={textData.flip}
      />
    </div>
  );
};

export default SpiralTextNode;
