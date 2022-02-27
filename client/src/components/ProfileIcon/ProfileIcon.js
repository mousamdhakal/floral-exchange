import './ProfileIcon.scss'


const ProfileIcon = (props) => {
    return (
        <div className='icon-container'>
            {props.firstName[0].toUpperCase()} {props.lastName[0].toUpperCase()}
        </div>
    )
}

export default ProfileIcon
