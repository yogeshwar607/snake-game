import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { postApiCall } from '../services';
import { Toast, Button , InputGroup, Spinner, Container} from 'react-bootstrap';

const PlayerEntry = (props) => {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [existingPlayerId, setExistingPlayerId] = useState('');
  const [newPlayerId, setNewPlayerId] = useState('');

  useEffect(() => {}, []);

  const createNewPlayerId = (e) => {
    console.log('createNewPlayerId', newPlayerId);
    // make api call and check if playerId uniq , proceed to game selection
    postApiCall({ data: { playerId: newPlayerId }, url: '/player/create' })
      .then((result) => {
        console.log(result);
        if (result.success) {
          navigate('/gameselection', { state: { playerId: result.playerId } });
        } else {
          showToastMessage(result.error);
        }
      })
      .catch((err) => {
        console.error(err);
        showToastMessage(err.error);
      });
  };
  const submitPlayerId = (e) => {
    console.log('submitPlayerId', existingPlayerId);

    postApiCall({ data: { playerId: existingPlayerId }, url: '/player/get' })
      .then((result) => {
        console.log("result",result);
        if (result.success) {
          navigate('/gameselection', { state: { playerId: result.playerId } });
        } else if(result.error){
          showToastMessage(result.error);
        }else {
          showToastMessage(JSON.stringify(result))
        }
      })
      .catch((err) => {
        console.error(err);
        showToastMessage(err.error);
      });
    // make api call and check if exists , proceed to game selection
  };

  const showToastMessage = (msg) => {
    setErrorMsg( msg);
    setErrorMsg(msg);
    setShowToast(true);
  };

  return (
    <div className="container">
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body>{errorMsg}</Toast.Body>
      </Toast>

      <p>Enter Player Id </p>
      <input defaultValue={existingPlayerId} onInput={(e) => setExistingPlayerId(e.target.value)} />
      <Button onClick={submitPlayerId}>Submit</Button>
      <br />
      <p>OR</p>
      <p>In case you do not have Player Id, create one below </p>
      <p> Create Player Id </p>
      <input defaultValue={newPlayerId} onInput={(e) => setNewPlayerId(e.target.value)} />
      <Button onClick={createNewPlayerId}>Submit
      </Button>
     
    </div>
  );
};

export default PlayerEntry;
