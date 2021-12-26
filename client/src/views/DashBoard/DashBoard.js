import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useState } from 'react'

import './DashBoard.scss'
import * as uiActions from '../../actions/uiActions'
import * as postActions from '../../actions/postActions'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageIcon from '@mui/icons-material/Message';

export class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.setActive('dashboard')
    this.props.getPosts()
  }

  render() {
    return (
      <div className='dashboard-container'>
        <div className="Searchbox">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            InputProps={{
              classes: {
                root: 'searchBar',
              },
              startAdornment: (
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />
        </div>
        <div className="dashboard-body">
          {this.props.posts.map((item) => (
            <>
              <div className="item-container">
                <div className="item-picture">
                  <img
                    className="login-image"
                    src="./assets/images/login-flower.png"
                    alt="People browing flowers"
                  />
                </div>
                <div className="item-title">
                  <div> {item.title} </div>
                  <div className="item-interaction"> <FavoriteBorderIcon /> <MessageIcon /> </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user, posts: state.post.posts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActive: (page) => dispatch(uiActions.setActive(page)),
    getPosts: () => dispatch(postActions.getPosts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashBoard))
