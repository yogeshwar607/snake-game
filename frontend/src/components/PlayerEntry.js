import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { postApiCall } from '../services';
const PlayerEntry = (props) => {
  const navigate = useNavigate();
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);

  const [existingPlayerId, setExistingPlayerId] = useState('');
  const [newPlayerId, setNewPlayerId] = useState('');

  useEffect(() => {}, []);

  const createNewPlayerId = (e) => {
    console.log('createNewPlayerId', newPlayerId);
    // make api call and check if playerId uniq , proceed to game selection
    postApiCall({ data: { playerId: newPlayerId }, url: '/player/create' })
      .then((result) => {
        console.log(result);

        navigate('/gameselection',{state:{playerId:result.playerId}});
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const submitPlayerId = (e) => {
    console.log('submitPlayerId', existingPlayerId);

    postApiCall({ data: { playerId: existingPlayerId }, url: '/player/get' })
      .then((result) => {
        console.log(result);
        navigate('/gameselection',{state:{playerId:result.playerId}});
      })
      .catch((error) => {
        console.error(error);
      });
    // make api call and check if exists , proceed to game selection
  };

  return (
    <div>
      <p> Enter player Id </p>
      <input value={existingPlayerId} onInput={(e) => setExistingPlayerId(e.target.value)} />
      <button onClick={submitPlayerId}>Submit</button>
      <br />
      <p>In case you do not have playerId , create one below </p>
      <p> Create player Id </p>
      <input value={newPlayerId} onInput={(e) => setNewPlayerId(e.target.value)} />
      <button onClick={createNewPlayerId}>Submit</button>
    </div>
  );
};

export default PlayerEntry;
