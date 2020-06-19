import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Toast } from 'react-bootstrap';
import { useNavigate } from '@reach/router';
import { postApiCall } from '../services';

const GameSelection = (props) => {
  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState('');
  const [gameId, setGameId] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [gameMode,setGameMode]=useState('multiplayer')

  useEffect(
    () => {
      setPlayerId(props.location.state.playerId);
    },
    [props.location.state.playerId]
  );

  const joinGame = () => {
    postApiCall({ data: { gameId: gameId, gameDetails: [{ player_id: playerId, score: 0 }] }, url: '/game/update' })
      .then((result) => {
        console.log(result);
        if (result.success) {
          navigate('/gameboard', {
            state: { playerId, gameId: result.gameId, gameDetails: result.gameDetails, gameType: 'joinGame',gameMode:result.gameMode }
          });
        } else {
          showToastMessage(result.error);
        }
      })
      .catch((err) => {
        console.error(err);
        showToastMessage(err.error);
      });
  };
  const startNewGame = () => {
    console.log("gameMode",gameMode)
    postApiCall({ data: {gameMode:gameMode, gameDetails: [{ player_id: playerId, score: 0 }] }, url: '/game/create', })
      .then((result) => {
        console.log(result);
        if (result.success) {
          navigate('/gameboard', {
            state: { playerId, gameId: result.gameId, gameDetails: result.gameDetails, gameType: 'newGame',gameMode }
          });
        } else {
          showToastMessage(result.error);
        }
      })
      .catch((err) => {
        console.error(err);
        showToastMessage(err.error);
      });
  };

  const showToastMessage = (msg) => {
    setErrorMsg(msg);
    setShowToast(true);
  };

  const onSelectModeSingle = () => {
    console.log("onSelectModeSingle")
    setGameMode('singleplayer')
  };
  const onSelectModeMultiPlayer = () => {
    console.log("onSelectModeMultiPlayer")
    setGameMode('multiplayer')
  };

  return (
    <div  className="container">
      <br />
      <br />
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body>{errorMsg}</Toast.Body>
      </Toast>

      <p>playerId : {playerId}</p>
      <p>Select Mode </p>
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={onSelectModeSingle}>
          Single
        </Button>
        <Button variant="secondary" onClick={onSelectModeMultiPlayer}>
          Multiplayer
        </Button>
      </ButtonGroup>
      <br />
      <Button onClick={startNewGame}>Start New Game</Button>
      <br />

      <p>Enter Game Id</p>
      <input defaultValue={gameId} onInput={(e) => setGameId(e.target.value)} />
      <Button variant="primary" onClick={joinGame}>
        Join Game
      </Button>
    </div>
  );
};

export default GameSelection;
