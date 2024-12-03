import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const element = e.target;
      if (window.getComputedStyle(element).cursor === 'pointer') {
        setIsPointer(true);
      }
    };

    const handleMouseLeave = (e) => {
      setIsPointer(false);
    };

    // Update position on mouse move
    window.addEventListener('mousemove', updateCursorPosition);

    // Add event listeners for pointer state
    document.querySelectorAll('*').forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      // Cleanup listeners
      window.removeEventListener('mousemove', updateCursorPosition);
      document.querySelectorAll('*').forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[5000] rounded-full mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '40px' : '20px',
          height: isPointer ? '40px' : '20px',
          backgroundColor: 'white',
          transition: 'width 0.2s, height 0.2s, transform 0.1s',
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      ></div>
      <div
        className="fixed pointer-events-none z-[5000] rounded-full border-2 border-white mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '40px',
          height: '40px',
          transition: 'transform 0.3s ease-out',
          transform: `translate(-50%, -50%) scale(${isPointer ? 0.5 : 1})`,
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
