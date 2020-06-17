import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const GameSelection = (props) => {
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    setPlayerId(props.location.state.playerId);
  }, []);

  return (
    <div>
      <p>Mode {playerId}</p>
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary">Single</Button>
        <Button variant="secondary">Multiplayer</Button>
      </ButtonGroup>
      <br />
      <Button>Start New Game</Button>
      <br />

      <p>Enter Game Id</p>
      <input />
      <Button variant="primary">Join Game</Button>
    </div>
  );
};

export default GameSelection;
