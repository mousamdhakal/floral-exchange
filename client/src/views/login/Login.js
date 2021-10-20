import { Component } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import LoginWrapper from '../../components/LoginWrapper'

export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonState: 'signIn',
    }
  }

  handleChange = (e) => {
    this.setState({buttonState:e.target.value})
  }
  render() {
    const { buttonState } = this.state

    return (
      <LoginWrapper>
        <div className="login-grid">
          <div className="login-image-container">
            <img
              className="login-image"
              src="./assets/images/login-flower.png"
              alt="People browing flowers"
            />
          </div>
          <div className="login-formarea">
            <ToggleButtonGroup
              classes={{ root: 'login-button-group' }}
              value={buttonState}
              exclusive
              onChange={this.handleChange}
            >
              <ToggleButton
                classes={{
                  root: 'login-button',
                  selected: 'selected-loginButton',
                }}
                value="signIn"
              >
                Sign In
              </ToggleButton>
              <ToggleButton
                classes={{
                  root: 'login-button',
                  selected: 'selected-loginButton',
                }}
                value="signUp"
              >
                Sign Up
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </LoginWrapper>
    )
  }
}

export default Login
