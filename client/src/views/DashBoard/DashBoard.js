import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

import './DashBoard.scss'
import * as uiActions from '../../actions/uiActions'
import * as postActions from '../../actions/postActions'

import ItemCard from '../../components/itemCards/ItemCard'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchOutlined from '@mui/icons-material/SearchOutlined'


const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

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
        {
          this.props.loading ? (
            <div className="loading-icon">
              <MoonLoader color={'green'} loading={this.props.loading} css={override} size={80} />
            </div>
          ) : (
            <>
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
                  <ItemCard image={item.image} key={item._id} title={item.title} description={item.description} date={item.date} self={false} />
                ))}
              </div>
            </>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user, posts: state.post.posts, loading: state.post.isCalling }
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
