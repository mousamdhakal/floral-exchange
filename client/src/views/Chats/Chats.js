import { useDispatch } from 'react-redux';

import * as uiActions from '../../actions/uiActions'

const Chats = () => {
  const dispatch = useDispatch();
  dispatch(uiActions.setActive('chats'));
  
  return (
    <div>
      <p>Chats</p>
    </div>
  )
}

export default Chats
