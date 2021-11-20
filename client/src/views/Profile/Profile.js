import { useDispatch } from 'react-redux';

import * as uiActions from '../../actions/uiActions'

const Profile = () => {
  const dispatch = useDispatch();
  dispatch(uiActions.setActive('profile'));

  return (
    <div>
      <p>Profile</p>
    </div>
  )
}

export default Profile
