import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon'

import './profile.scss'
import * as uiActions from '../../actions/uiActions'
import * as postActions from '../../actions/postActions'

import ItemCard from '../../components/itemCards/ItemCard'


export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.setActive('profile')
    this.props.getUserPosts(this.props.user._id)
  }

  render() {
    return (
      <div className='profile-container'>
        <div className="profile-title">
          <ProfileIcon firstName='alan' lastName='paul' />
        </div>
        <div className="profile-item">
          {this.props.posts &&
            this.props.posts.map((item) => (
              <ItemCard
                image={item.image}
                key={item._id}
                title={item.title}
                description={item.description}
                date={item.date}
              />
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user, posts: state.post.userPosts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActive: (page) => dispatch(uiActions.setActive(page)),
    getUserPosts: (id) => dispatch(postActions.getUserPosts(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile))
