import { useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const ToggleButtons = ({ states, initialState, handleChange }) => {
  const [buttonState, setButtonState] = useState(initialState)

  const changeHandler = (e) => {
    setButtonState(e.target.value)
    handleChange(e)
  }

  return (
    <ToggleButtonGroup
      classes={{ root: 'login-button-group' }}
      value={buttonState}
      exclusive
      onChange={changeHandler}
    >
      <ToggleButton
        classes={{
          root: 'login-button',
          selected: 'selected-loginButton',
        }}
        value={states[0].value}
      >
        {states[0].name}
      </ToggleButton>
      <ToggleButton
        classes={{
          root: 'login-button',
          selected: 'selected-loginButton',
        }}
        value={states[1].value}
      >
        {states[1].name}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ToggleButtons
