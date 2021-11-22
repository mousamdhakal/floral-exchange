import Button from '@mui/material/Button'
import './NavButton.scss'
import { Link } from 'react-router-dom'

const NavButton = ({ Icon, name, text, activeIcon }) => {
  return (
    <Link to={`/${name}`}>
      <Button
        classes={{
          outlined: `${activeIcon === name ? 'navButton-active' : 'navButton'}`,
          startIcon: `${activeIcon === name ? 'navIcon-active' : 'navIcon'}`,
        }}
        variant="outlined"
        startIcon={<Icon />}
      >
        {text}
      </Button>
    </Link>
  )
}

export default NavButton
