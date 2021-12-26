import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useState } from 'react'

import './DashBoard.scss'
import * as uiActions from '../../actions/uiActions'

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
  }

  render() {
    const items = [
      { title: 'abc', type: 'def', tags: 'ghi', id: 1 },
      { title: '123', type: '456', tags: '789', id: 2 },
      { title: 'kakha', type: 'gagha', tags: 'nacha', id: 3 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 4 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 5 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 6 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 7 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 8 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 9 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 10 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 11 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 12 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 13 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 14 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 15 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 16 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 17 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 18 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 19 },
      { title: 'ekdui', type: 'tinchar', tags: 'pachxa', id: 20 }
    ];
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
          {items.map((item) => (
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
                  <div> { item.title } </div>
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
  return { user: state.user.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActive: (page) => dispatch(uiActions.setActive(page)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashBoard))
