import socketIOClient from 'socket.io-client';
import { BASESERVERURL } from '../../constants';

import React, { useState, useEffect } from 'react';
import GameStart from './GameStart';
import GameOver from './GameOver';
import { useGameLoop, randomPosition, getRowsColumns, displayGrid, useInterval, displayScore } from './GameHelper';
import GameInput from './GameInput';
import { subscribeToTimer } from '../../Api';
import SnakeCanvas from '../canvas/canvas';

let socket = '';
let gameId = '';
let playerId = '';
let gameType = '';
let gameDetails = '';
let position = [{ x: 10, y: 20 }];
let gameMode = '';

const Game = (props) => {
  const height = 30;
  const width = 30;

  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [remoteSnake, setRemoteSnake] = useState(null);
  const [food, setFood] = useState(randomPosition(width, height));
  const [direction, setDirection] = useState('right');
  const [startGame, setStartGame] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [remoteScore, setRemoteScore] = useState(0);
  const [timestamp, setTimestamp] = useState('no timestamp yet');
  const [gameIdState,setGameIdState] = useState('')

  useEffect(() => {
    gameId = props.location.state.gameId;
    playerId = props.location.state.playerId;
    gameType = props.location.state.gameType;
    gameDetails = props.location.state.gameDetails;
    gameMode = props.location.state.gameMode;
    
    setGameIdState(gameId)

    socket = socketIOClient(BASESERVERURL);

      // init sockets
      initSocketEvents();

      console.log('gameId', 'gameId', gameId, 'gameMode', gameMode);

      if (gameType === 'newGame') {
        emitEvent('newGameStarted', { gameId, playerId, position, gameDetails });
      }

      if (gameType === 'joinGame') {
        emitEvent('gameJoined', { gameId, playerId, position, gameDetails });
      }

      // cleanup
      return () => {
        // disconnect socket
        socket.disconnect();
      };
    },
    [props.location.state.gameId]
  );

  useEffect(
    () => {
      window.addEventListener('keydown', ({ key }) => GameInput(key, direction, setDirection));
      return () => {
        window.removeEventListener('keydown', GameInput);
      };
    },
    [direction, setDirection]
  );

  const moveSnake = () => {
    if (startGame && snake && snake.length) {
      // console.log('DIRECTION ', direction);
      const newSnake = [];
      switch (direction) {
        case 'right':
          if (snake[0].x >= width) {
            onBoundryTouched();
          } else {
            newSnake.push({ x: snake[0].x + 1, y: snake[0].y });
          }
          break;
        case 'left':
          if (snake[0].x < 0) {
            onBoundryTouched();
          } else {
            newSnake.push({ x: snake[0].x - 1, y: snake[0].y });
          }
          break;
        case 'top':
          if (snake[0].y < 0) {
            onBoundryTouched();
          } else {
            newSnake.push({ x: snake[0].x, y: snake[0].y - 1 });
          }
          break;
        case 'bottom':
          if (snake[0].y >= height) {
            onBoundryTouched();
          } else {
            newSnake.push({ x: snake[0].x, y: snake[0].y + 1 });
          }
      }
      snake.forEach((cell) => {
        newSnake.push(cell);
      });

      detectCollision({ snakeHead: { x: snake[0].x, y: snake[0].y } });

      if (snake[0].x === food.x && snake[0].y === food.y) {
        // send event when food is consumed by snake to
        emitEvent('newFood', { gameId, playerId, gameDetails, updateScore: true });
      } else {
        newSnake.pop();
      }

      // setScore(snake.length);
      setSnake(newSnake);
      console.log('emitplayerId', playerId);
      emitEvent('moved', { gameId, playerId, position: newSnake });
    }
  };

  const detectCollision = ({ snakeHead }) => {
    if (gameMode === 'singleplayer') return;
    remoteSnake.map((element) => {
      if (snakeHead.x === element.x && snakeHead.y === element.y) {
        console.log('detectCollision');
        setAlive(false);
        setStartGame(false);
        emitEvent('gameover', { });
      }
      return null;
    });
  };

  const gameResult = () => {
    // socket disconnet , , winner decide and show on screen
  };
  const onBoundryTouched = () => {
    // socket disconnet , , winner decide and show on screen
    // TODO: game over
    setAlive(false);
    emitEvent('gameover', { });
    setStartGame(false);

    // TODO
    gameResult();

  };
  const emitEvent = (eventName, config) => {
    socket.emit(`${eventName}`, { ...config });
  };

  const initSocketEvents = () => {
    socket.on('connect', function () {
      console.log('connect');
      socket.emit('room', gameId);
    });

    // when a new snake enter
    socket.on('newGameStarted', function({ position }) {
      console.log('newGameStarted', position);

      if (gameMode === 'singleplayer') {
        console.log("gameMode === 'singleplayer'");
        emitEvent('newFood', { gameId, gameDetails, playerId, updateScore: false });
        setSnake(position);
        setStartGame(true);
      }

      // TODO: we need to show message i.e waiting for other player to join
      // position :[{x:0,y:0}] , playerId , gameId
    });

    socket.on('gameJoined', function({ position, playerId: remotePlayerId, gameId, remotePosition }) {
      // console.table('gameJoined', 'position', position, 'remotePosition', remotePosition, 'gameDetails', gameDetails);

      emitEvent('newFood', { gameId, gameDetails, playerId, updateScore: false });
      if (remotePlayerId === playerId) {
        setSnake(position);
        setRemoteSnake(remotePosition);
      } else {
        setSnake(remotePosition);
        setRemoteSnake(position);
      }
      setStartGame(true);
    });

    socket.on('moved', function ({ gameId, playerId: remotePlayerId, position: remoteSnake }) {
      if (remotePlayerId !== playerId) {
        setRemoteSnake(remoteSnake);
      }
    });

    socket.on('score', function({ gameDetails: newGameDetails }) {
      console.log('score', newGameDetails);
      for (const score of newGameDetails) {
        if (score.player_id === playerId) {
          setScore(score.score);
        } else {
          setRemoteScore(score.score);
        }
      }

      gameDetails = newGameDetails;
    });
    socket.on('newFood', function({ gameId, playerId, position: newFoodPos }) {
      setFood(newFoodPos);
    });
    socket.on('gameover', function({}) {
      console.log("gameover")
      setAlive(false);
    });
  };

  // console.log(snake);
  // useInterval(moveSnake, speed);
  //requestAnimationFrame(moveSnake);
  useGameLoop(moveSnake);

  //return <SnakeCanvas snakes={[snake, remoteSnake]} food={food} />;
  return (
    <div className="container">
      {startGame ? (
        <div>
          <p>
            Your Score: {score}, Your Opponent Score: {remoteScore}{' '}
          </p>
          {alive ? (
            <SnakeCanvas snakes={[snake, remoteSnake]} food={food} />
          ) : (
            <GameOver alive={alive} />
          )}
        </div>
      ) : alive === false ? <GameOver alive={alive} /> :(
        <GameStart gameId={gameIdState}/>
      )}
    </div>
  );
};

export default Game;
