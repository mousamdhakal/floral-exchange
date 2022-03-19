import { useSelector } from 'react-redux'
import './Header.scss'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ChatRoundedIcon from '@mui/icons-material/ChatRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import HomeIcon from '@mui/icons-material/Home'
import Logout from '../Logout/Logout'

import NavButton from '../NavButton/NavButton'
import { Link } from 'react-router-dom'

const Header = () => {
  let active = useSelector((state) => state.ui.active)

  return (
    <div className="header-wrapper">
      <Link to="/">
        <img
          className="brand-logo"
          src="./assets/images/logo.png"
          alt="brand"
        />
      </Link>
      <NavButton
        activeIcon={active}
        name="dashboard"
        Icon={HomeIcon}
        text={'Dashboard'}
      />
      <NavButton
        activeIcon={active}
        name="nearbyItems"
        Icon={LocationOnIcon}
        text={'Nearby Items'}
      />
      <NavButton
        activeIcon={active}
        name="newItem"
        Icon={AddRoundedIcon}
        text={'New Item'}
      />
      <NavButton
        activeIcon={active}
        name="chats"
        Icon={ChatRoundedIcon}
        text={'Chats'}
      />
      {/* <NavButton
        activeIcon={active}
        name="activity"
        Icon={NotificationsRoundedIcon}
        text={'Activity'}
      /> */}
      <NavButton
        activeIcon={active}
        name="profile"
        Icon={PersonRoundedIcon}
        text={'Profile'}
      />
      <Logout />
    </div>
  )
}

export default Header
