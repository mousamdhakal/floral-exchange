import './ProfileIcon.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const ProfileIcon = (props) => {
    return (
        <div className='icon-container'>
            {
                props && props.icon ?
                    <img src={props.user.profilePic} alt='profile-pic' /> :
                    <div className='named-icon'>
                        <p> {props.firstName && props.firstName[0].toUpperCase()} {props.lastName && props.lastName[0].toUpperCase()} </p>
                    </div>
            }
        </div>
    )
}

export default ProfileIcon
