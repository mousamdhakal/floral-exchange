import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import { filterPosts, sequentialSearch, sortPosts } from "../../utils/utils";

import './DashBoard.scss'
import * as uiActions from '../../actions/uiActions'
import * as postActions from '../../actions/postActions'
import * as userActions from '../../actions/userActions'
import { Typography } from '@mui/material'


import ItemCard from '../../components/itemCards/ItemCard'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import Dropdown from '../../components/Dropdown/Dropdown'

const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

export class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentType: 'all',
      currentSort: '',
      filteredPosts: [],
      searchText: ''
    }
  }

  componentDidMount() {
    this.props.setActive('dashboard')
    this.props.getPosts()
  }

  handleDropdownChange = (e) => {
    this.setState({ currentType: e.target.value }, this.runConstraints)
  }

  handleSort = (e) => {
    this.setState({ currentSort: e.target.value }, this.runConstraints)
  }

  handleSearch = (e) => {
    let filteredPosts = sequentialSearch(this.props.posts,['title','description'],e.target.value)
    this.setState({ filteredPosts, currentSort: '', currentType: 'all', searchText: e.target.value })
  }

  runConstraints = () => {
    let newPosts = filterPosts(this.props.posts, this.state.currentType)
    if(this.state.currentSort) {
      newPosts = sortPosts(newPosts, this.state.currentSort);
    }
    this.setState({ filteredPosts: newPosts })
  }

  render() {
    let { currentType, currentSort, filteredPosts, searchText } = this.state

    filteredPosts = filteredPosts && filteredPosts.length > 0  ? filteredPosts : this.props.posts && !searchText ? this.props.posts : []

    return (
      <div className='dashboard-container'>
        {
          this.props.loading ? (
            <div className="loading-icon">
              <MoonLoader color={'green'} loading={this.props.loading} css={override} size={80} />
            </div>
          ) : (
            <>
              <div className='dashboard-searchAndFilter'>
                <div className="Searchbox">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search"
                    onChange={this.handleSearch}
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
                <div className="Filterbox">
                  <Typography className="filter-text">Sort By:</Typography>
                  <Dropdown
                    data={[
                      { name: 'Date', value: 'date' },
                      { name: 'Title', value: 'title' },
                    ]}
                    containerClass="dropdown-filter"
                    setDropdownValue={this.handleSort}
                    value={currentSort}
                  />
                </div>
                <div className="Filterbox">
                  <Typography className="filter-text">Filter By:</Typography>
                  <Dropdown
                    data={[
                      { name: 'All', value: 'all' },
                      { name: 'Tree', value: 'tree' },
                      { name: 'Flower', value: 'flower' },
                      { name: 'Plant', value: 'plant' },
                    ]}
                    containerClass="dropdown-filter"
                    setDropdownValue={(e) => this.handleDropdownChange(e)}
                    value={currentType}
                  />
                </div>
              </div>

              <div className="dashboard-body">
                {filteredPosts.map((item) => (
                  <ItemCard _id={item._id} image={item.image} key={item._id} title={item.title} description={item.description} date={item.date} user_id={item.user_id} self={false} />
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
    getUser: (id) => dispatch(userActions.getUser(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashBoard))
