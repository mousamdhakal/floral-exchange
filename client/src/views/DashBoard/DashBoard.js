import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './DashBoard.scss'
import * as uiActions from '../../actions/uiActions'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchOutlined from '@mui/icons-material/SearchOutlined'

export class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.setActive('dashboard')
  }

  render() {
    return (
      <div className='dashboard-container'>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          InputProps={{
            classes:{
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
