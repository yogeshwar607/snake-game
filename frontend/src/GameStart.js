import React from "react";

const GameStart = (startGame, setStartGame, setSpeed) => {
  const start = () => {
    setStartGame(false);
    setSpeed(150);
  };
  return <div className={startGame ? 'startGame' : 'onGame'}>
    <h1>
      <span className={'food'}></span>
      Snake
       <span className={'food'}></span>
    </h1>
    <h3>Choose Level:</h3>
    <button className={'slug'} onClick={start}>SLUG</button>
    <button className={'worm'} onClick={start}>WORM</button>
    <button className={'python'} onClick={start}>PYTHON</button>
  </div>
};

export default GameStart;
