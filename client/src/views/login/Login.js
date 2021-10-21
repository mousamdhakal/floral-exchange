import { Component } from 'react'

import LoginWrapper from '../../components/LoginWrapper'
import FormInput from '../../components/Input/FormInput'
import ToggleButtons from '../../components/ToggleButtons/ToggleButtons'
import Button from '../../components/Button/Button'

export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonState: 'signIn',
      email: '',
      password: '',
    }
  }

  handleChange = (e, name) => {
    if (name == 'auth') {
      this.setState({ buttonState: e.target.value })
    } else if (name == 'email') {
      this.setState({ email: e.target.value })
    } else if (name == 'password') {
      this.setState({ password: e.target.value })
    }
  }

  handleSignUp = () => {
    console.log('Sign Up')
  }

  render() {
    const { buttonState, email, password } = this.state

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
            <div className="login-buttons-container">
              <ToggleButtons
                initialState={'signIn'}
                states={[
                  { name: 'Sign In', value: 'signIn' },
                  { name: 'Sign Up', value: 'signup' },
                ]}
                handleChange={(e) => this.handleChange(e, 'auth')}
              />
            </div>
            <FormInput
              containerClass={'half-width-container'}
              name="Email"
              id="login-email"
              value={email}
              handleChange={(e) => this.handleChange(e, 'email')}
            />
            <FormInput
              containerClass={'half-width-container mt-24'}
              name="Password"
              id="login-password"
              value={password}
              type={'password'}
              handleChange={(e) => this.handleChange(e, 'password')}
            />
            <Button variant={'contained'} containedButton={'contained-full-button half-width mt-48'} handleClick={this.handleSignUp}>Sign Up</Button>
          </div>
        </div>
      </LoginWrapper>
    )
  }
}

export default Login
