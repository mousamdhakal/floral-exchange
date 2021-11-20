import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function withAuthenticated(ComposedComponent) {
  class AuthenticatedCheck extends Component {
    constructor(props) {
      super(props);
      this.checkAuthenticated();
    }

    checkAuthenticated = () => {
      console.log(this.props.authenticated)
      if (!this.props.isAuthenticated) {
        const { history } = this.props;
        history.push(`/login`, null);
      }
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { isAuthenticated: state.user.isAuthenticated };
  };

  return connect(mapStateToProps)(withRouter(AuthenticatedCheck));
}
