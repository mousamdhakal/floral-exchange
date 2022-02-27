import Button from '@mui/material/Button'
import setAuthorizationToken from '../../utils/authorizationHeader';
import { useHistory } from 'react-router-dom';

import './Logout.scss'

const Logout = () => {
    const history = useHistory();
    const logout = () => {
        localStorage.clear();
        setAuthorizationToken();
        window.location.reload();
        // console.log(history);
        // history.push('/', null);
    }
    return (
        <Button onClick={logout}
            variant='contained'
            className='logout-container'
        >Log out</Button>
    )
}

export default Logout