import React, { useEffect, useRef } from 'react';
const color = '#263012';
const drawSingleBlock = (ctx, startX, startY, width, height, color) => {
  //ctx.save();
  ctx.fillStyle = color;
  console.log(`${startX},  ${startY}, ${width}, ${height}`);
  ctx.fillRect(startX, startY, width, height);
  //ctx.restore();
};

const drawSnake = (snake, canvasRef) => {
  const canvas = canvasRef.current;
  const canvasOptions = {};
  canvasOptions.context = canvas.getContext('2d');
  const snakeData = snake;
  const width = 500;
  const height = 500;

  
  for (let j = 0; j < snakeData.length; j += 1) {
    if (snakeData[j]) {
      const x = snakeData[j]['x'];
      const y = snakeData[j]['y'];
      //console.log(`height => ${barHeight}, width => ${barSize} x => ${x} y => ${y}`);
      drawSingleBlock(canvasOptions.context, x * 20, y * 20, 20, 20, color);
    }
  }
};

const SnakeCanvas = ({ snake, food }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasOptions = {};
    canvasOptions.context = canvas.getContext('2d');
    canvasOptions.context.clearRect(0, 0, 500, 500);
    drawSnake(snake, canvasRef);
    drawSingleBlock(canvasOptions.context, food.x * 20, food.y * 20, 30, 30, color);
  }, [snake]);

  return (
    <div>
      <canvas className='canvas-bar' ref={canvasRef} width={400} height={400} style={{border: "1px solid #263012"}}/>
    </div>
  );
};

export default SnakeCanvas;
