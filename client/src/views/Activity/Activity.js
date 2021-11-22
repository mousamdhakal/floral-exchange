import { useDispatch } from 'react-redux';

import * as uiActions from '../../actions/uiActions'

const Activity = () => {
  const dispatch = useDispatch();
  dispatch(uiActions.setActive('activity'));

  return (
    <div>
      <p>Activity</p>
    </div>
  )
}

export default Activity
