import React from "react";

const GameInput =  (key, direction, setDirection) => {
  console.log('key pressed ', key);
  switch (key) {
    case 'ArrowUp':
      if (direction !== 'bottom') {
        return setDirection('top');
      }
      break;
    case 'ArrowDown':
      if (direction !== 'top') {
        return setDirection('bottom');
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'right') {
        return setDirection('left');
      }
      break;
    case 'ArrowRight':
      if (direction !== 'left') {
        return setDirection('right');
      }
      break;
  }
};

export default GameInput;
