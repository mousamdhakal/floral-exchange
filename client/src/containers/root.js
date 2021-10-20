import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as userActions from '../actions/userActions';

class Root extends Component {

  componentDidMount = () => {
    this.props.removeUser()
  }

  render() {
    return (
      <div>
        <p>test</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.isAuthenticated, user: state.user.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => dispatch(userActions.removeUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root)
