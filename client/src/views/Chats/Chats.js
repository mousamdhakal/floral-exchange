import { useDispatch } from 'react-redux';
import io from 'socket.io-client'

import * as uiActions from '../../actions/uiActions'

let socket;

const Chats = () => {
  const dispatch = useDispatch();
  dispatch(uiActions.setActive('chats'));
  const ENDPOINT = 'http://localhost:5022';
  socket = io(ENDPOINT);

  return (
    <div>
      <p>Chats</p>
    </div>
  )
}

export default Chats
