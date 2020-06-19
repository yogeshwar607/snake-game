import React, { useEffect, useRef } from 'react';
const color = '#263012';
const drawSingleBlock = (ctx, startX, startY, width, height, color) => {
  //ctx.save();
  ctx.fillStyle = color;
  // console.log(`${startX},  ${startY}, ${width}, ${height}`);
  ctx.fillRect(startX, startY, width, height);
  //ctx.restore();
};

const drawSnake = (snake, color, canvasRef) => {
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

const SnakeCanvas = ({ snakes, food }) => {
  const canvasRef = useRef(null);
  const colors = ['#ff0000', '#00ff00', '#0000ff'];
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasOptions = {};
    canvasOptions.context = canvas.getContext('2d');
    canvasOptions.context.clearRect(0, 0, 600, 600);

    let i = 0;
    for (const snake of snakes) {
      if (snake) {
        drawSnake(snake, colors[i], canvasRef);
      }
      i++;
    }

    drawSingleBlock(canvasOptions.context, food.x * 20, food.y * 20, 20, 20, color);
  }, [snakes]);

  return (
    <div>
      <canvas
        className='canvas-bar'
        ref={canvasRef}
        width={600}
        height={600}
        style={{ border: '1px solid #263012' }}
      />
    </div>
  );
};

export default SnakeCanvas;
