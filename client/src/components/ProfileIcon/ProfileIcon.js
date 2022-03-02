import './ProfileIcon.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const ProfileIcon = (props) => {
    return (
        <div className='icon-container'>
            {
                props.user && props.user.profilePic ?
                    <img src={props.user.profilePic} alt='profile-pic' /> :
                    <div className='named-icon'>
                        <p> {props.user && props.user.firstName[0]} {props.user && props.user.lastName[0]} </p>
                    </div>
            }
        </div>
    )
}

export default ProfileIcon
