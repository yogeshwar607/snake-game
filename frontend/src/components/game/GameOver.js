import React from 'react';

const GameOver = alive => {
  return (
    <div className='container'>
      <div className={alive ? 'dead' : 'dead'}>
        <h3>Game Over</h3>
      </div>
    </div>
  );
};

export default GameOver;
