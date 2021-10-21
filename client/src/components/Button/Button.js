import BaseButton from '@mui/material/Button'
import './Button.scss'

const Button = ({
  variant,
  handleClick,
  rootButton,
  containedButton,
  children,
}) => {
  return (
    <BaseButton
      variant={variant ? variant : 'contained'}
      onClick={handleClick}
      classes={{
        root: rootButton,
        contained: containedButton,
      }}
    >
      {children}
    </BaseButton>
  )
}

export default Button
