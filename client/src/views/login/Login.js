import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginWrapper from '../../components/LoginWrapper'
import FormInput from '../../components/Input/FormInput'
import ToggleButtons from '../../components/ToggleButtons/ToggleButtons'
import Button from '../../components/Button/Button'

import * as userActions from '../../actions/userActions'

export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonState: 'signIn',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      userName: ''
    }
  }

  handleChange = (e, name) => {
    if (name === 'auth') {
      this.setState({ buttonState: e.target.value })
    } else if (name === 'email') {
      this.setState({ email: e.target.value })
    } else if (name === 'password') {
      this.setState({ password: e.target.value })
    } else if (name === 'firstName') {
      this.setState({ firstName: e.target.value })
    } else if (name === 'lastName') {
      this.setState({ lastName: e.target.value })
    } else if (name === 'userName') {
        this.setState({ userName: e.target.value })
    }
  }

  handleAuth = () => {
    if(this.state.buttonState === 'signUp') {
      this.props.register(
        { email: this.state.email, 
          password: this.state.password, 
          // first_name: this.state.firstName, 
          // last_name: this.state.lastName,
          user_name: this.state.userName
        },this.props.history)
    } else if (this.state.buttonState === 'signIn') {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      },this.props.history)
    }
  }

  render() {
    const { buttonState, email, password, firstName, lastName,userName } = this.state

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
                  { name: 'Sign Up', value: 'signUp' },
                ]}
                handleChange={(e) => this.handleChange(e, 'auth')}
              />
            </div>
            {buttonState === 'signUp' && (
              <>
                {/* <FormInput
                  containerClass={'half-width-container'}
                  name="First Name"
                  id="first-name"
                  value={firstName}
                  handleChange={(e) => this.handleChange(e, 'firstName')}
                />
                <FormInput
                  containerClass={'half-width-container mt-24 mb-24'}
                  name="Last Name"
                  id="last-name"
                  value={lastName}
                  handleChange={(e) => this.handleChange(e, 'lastName')}
                /> */}
                <FormInput
                  containerClass={'half-width-container mt-24 mb-24'}
                  name="User Name"
                  id="user-name"
                  value={userName}
                  handleChange={(e) => this.handleChange(e, 'userName')}
                />
              </>
            )}
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
            <Button
              variant={'contained'}
              containedButton={'contained-full-button half-width mt-48'}
              handleClick={this.handleAuth}
            >
              {buttonState === 'signUp' ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </div>
      </LoginWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.isAuthenticated, user: state.user.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (props, history) => dispatch(userActions.registerRequest(props, history)),
    login: (props, history) => dispatch(userActions.loginRequest(props, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
