import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { ToggleButtonGroup } from '@mui/material'
import { ToggleButton } from '@mui/material'
import Modal from '../../components/Modal/Modal'
import Dropdown from '../../components/Dropdown/Dropdown'
import FormInput from '../../components/Input/FormInput'

import './profile.scss'
import * as uiActions from '../../actions/uiActions'
import * as postActions from '../../actions/postActions'
import * as userActions from '../../actions/userActions'

import ItemCard from '../../components/itemCards/ItemCard'
import ToggleButtons from '../../components/ToggleButtons/ToggleButtons'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonState: 'posts',
      isOpen: false,
      interest: 'flower',
      userName: this.props.user.user_name,
      firstName: this.props.user.first_name,
      lastName: this.props.user.last_name,
      email: this.props.user.email,
      location: 'kathmandu',
      updatedItems: {},
    }
  }

  handleChange = (e, name) => {
    this.setState({ updatedItems: { ...this.state.updatedItems, [e.target.name]: e.target.value } })
  }

  initialState = {
    interest: 'flower',
    userName: this.props.user.user_name,
    firstName: this.props.user.first_name,
    lastName: this.props.user.last_name,
    email: this.props.user.email,
    location: 'kathmandu',
  }
  handleReset = () => {
    this.setState(() => this.initialState)
  }

  handleCancel = () => {
    this.setState({ isOpen: false })
    this.setState(() => this.initialState)
  }

  handleSave = () => {
    // console.log(this.state.updatedItems)
    this.props.updateUser(this.state.updatedItems)
  }

  componentDidMount() {
    this.props.setActive('profile')
    this.props.getUserPosts(this.props.user._id)
    this.props.getUser(this.props.user._id)
  }

  render() {
    const { interest, email, userName, firstName, lastName, location, updatedItems } =
      this.state

    return (
      <div className="profile-container">
        <div className="profile-title">
          <div className="profile-icon">
            <ProfileIcon
              firstName={this.props.user.first_name}
              lastName={this.props.user.last_name}
              icon={null}
            />
          </div>
          <div className="userDetail-container">
            <p className="profile-userName">{userName}</p>
            <div>
              <p>
                {this.props.user.first_name} {this.props.user.last_name}
              </p>
            </div>
            <div
              className="edit-profile"
              onClick={() => this.setState({ isOpen: true })}
            >
              <p className="edit-profileText"> Edit Profile </p>
              <EditIcon fontSize="small" />
            </div>
          </div>
        </div>
        <Modal
          open={this.state.isOpen}
          handleClose={() => {
            this.setState({ isOpen: false })
          }}
        >
          <div className="edit-profile-container">
            <div className="edit-profile-row">
              <div className="edit-profile-title">Edit your Profile</div>
              <div
                className="edit-profile-close"
                onClick={() => {
                  this.setState({ isOpen: false })
                }}
              >
                <CloseIcon fontSize="small" />
              </div>
            </div>
            <div className="edit-profile-row">
              <div className="edit-profile-label">User Name</div>
              <div className="uneditable-profile-input">{userName}</div>
            </div>
            <div className="edit-profile-row">
              <div className="edit-profile-label">Email</div>
              <div className="uneditable-profile-input">{email}</div>
            </div>
            <div className="edit-profile-row">
              <div className="edit-profile-label">First Name: </div>
              <div className="edit-profile-input">
                <FormInput
                  name="firstName"
                  inputName="first_name"
                  type="text"
                  value={updatedItems.first_name ? updatedItems.first_name : firstName}
                  handleChange={(e) => this.handleChange(e, 'firstName')}
                  label={false}
                />
              </div>
            </div>
            <div className="edit-profile-row">
              <div className="edit-profile-label">Last Name: </div>
              <div className="edit-profile-input">
                <FormInput
                  name="lastName"
                  inputName="last_name"
                  type="text"
                  value={updatedItems.last_name ? updatedItems.last_name : lastName}
                  handleChange={(e) => this.handleChange(e, 'lastName')}
                  label={false}
                />
              </div>
            </div>
            <div className="edit-profile-row">
              <div className="edit-profile-label">Location: </div>
              <div className="edit-profile-input">
                <FormInput
                  inputName="location"
                  name="location"
                  type="text"
                  value={updatedItems.location ? updatedItems.location : location}
                  handleChange={(e) => this.handleChange(e, 'location')}
                  label={false}
                />
              </div>
            </div>
            <div className="edit-profile-row">
              <div className="edit-profile-label">Interest: </div>
              <div className="edit-profile-input">
                <Dropdown
                  name="interest"
                  data={[
                    { name: 'Tree', value: 'tree' },
                    { name: 'Flower', value: 'flower' },
                    { name: 'Plant', value: 'plant' },
                  ]}
                  containerClass="dropdownWithMarginBottom"
                  setDropdownValue={(e) => this.handleChange(e, 'dropdown')}
                  value={updatedItems.interest ? updatedItems.interest : interest}
                />
              </div>
            </div>
            <div className="edit-profile-action">
              <div
                className="edit-profile-button-reset"
                onClick={this.handleReset}
              >
                Reset
              </div>
              <div
                className="edit-profile-button-cancel"
                onClick={this.handleCancel}
              >
                Cancel
              </div>
              <div
                className="edit-profile-button-save"
                onClick={this.handleSave}
              >
                Save
              </div>
            </div>
          </div>
        </Modal>
        <div className="toggleButtonContainer">
          <ToggleButtonGroup
            classes={{ root: 'post-button-group' }}
            value={this.state.buttonState}
            exclusive
            onChange={(e) => {
              this.setState({ buttonState: e.target.value })
            }}
          >
            <ToggleButton
              value="posts"
              classes={{
                root: 'post-button',
                selected: 'selected-postButton',
              }}
            >
              Posts
            </ToggleButton>
            <ToggleButton
              value="liked"
              classes={{
                root: 'post-button',
                selected: 'selected-postButton',
              }}
            >
              Liked Posts
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {this.state.buttonState === 'posts' ? (
          <div className="profile-item">
            {this.props.posts &&
              this.props.posts.map((item) => (
                <ItemCard
                  key={item._id}
                  type={item.type}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  date={item.date}
                  self={true}
                  deleteThis={() => console.log('deleted')}
                />
              ))}
          </div>
        ) : (
          <div> These are the liked post </div>
        )}
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
    getUser: (id) => dispatch(userActions.getUser(id)),
    updateUser: (user) => dispatch(userActions.updateUser(user)),
    // deletePost: (id) => dispatch(postActions.deletePost(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
