import Button from '@mui/material/Button'
import setAuthorizationToken from '../../utils/authorizationHeader';
import { toast } from 'react-toastify'
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import * as userActions from '../../actions/userActions'


import './Logout.scss'

const Logout = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.clear();
        setAuthorizationToken();
        history.push('/login')
        dispatch(userActions.setAuthenticated(false))
        toast.success('Logout Successful')
    }
    return (
        <Button onClick={logout}
            variant='contained'
            className='logout-container'
        >Log out</Button>
    )
}

export default Logout