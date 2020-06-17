import React from "react";

const GameOver = (alive) => {
  return <div className={alive ? 'alive' : 'dead'}>
    <h3>Game Over</h3>
  </div>
};

export default GameOver;
