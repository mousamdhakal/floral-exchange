import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon'
import EditIcon from '@mui/icons-material/Edit';
import ToggleButtons from '../../components/ToggleButtons/ToggleButtons'


import './profile.scss'
import * as uiActions from '../../actions/uiActions'
import * as postActions from '../../actions/postActions'

import ItemCard from '../../components/itemCards/ItemCard'

const user = {
  userName: 'MrWorldWide',
  firstName: 'Kawadi',
  lastName: 'Manxe',
}

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
          <div className="profile-icon">
            <ProfileIcon user={user} />
          </div>
          <div className="userDetail-container">
            <p className="profile-userName">{user.userName}</p>
            <div>
              <p>{user.firstName} {user.lastName}</p>
            </div>
            <div className="edit-profile" onClick={() => { }}>
              <p className="edit-profileText"> Edit Profile </p>
              <EditIcon fontSize='small' />
            </div>
          </div>
        </div>
        <div className="profile-post">
          <ToggleButtons
            initialState={'Your Posts'}
            states={[
              { name: 'Your Posts', value: 'selfPost' },
              { name: 'Liked Posts', value: 'likedPost' },
            ]}
            handleChange={(e) => this.handleChange(e, 'auth')}
          />
        </div>
        <div className="profile-item">
          {this.props.posts && this.props.posts.map((item) => (
            <ItemCard key={item._id} title={item.title} description={item.description} date={item.date} self={true} />
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
