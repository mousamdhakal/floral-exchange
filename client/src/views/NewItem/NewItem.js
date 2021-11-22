import { useDispatch } from 'react-redux';

import * as uiActions from '../../actions/uiActions'

const NewItem = () => {
  const dispatch = useDispatch();
  dispatch(uiActions.setActive('newItem'));

  return (
    <div>
      <p>New Item</p>
    </div>
  )
}

export default NewItem
