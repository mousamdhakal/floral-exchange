import { Typography } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

import * as uiActions from '../../actions/uiActions'
import * as postActions from '../../actions/postActions'
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'
import Button from '../../components/Button/Button'
import FormInput from '../../components/Input/FormInput'
import Description from '../../components/Description/Description'
import Tags from '../../components/Tags/Tags'
import Dropdown from '../../components/Dropdown/Dropdown'
import { InputLabel } from '@mui/material'

export class NewItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tags: '',
      description: '',
      type: '',
      uploadedImage: {},
      uploadedImageUrl: '',
    }
  }

  componentDidMount() {
    this.props.setActive('newItem')
  }

  initialState = {
    title: '',
    tags: '',
    description: '',
    type: '',
  }

  handleChange = (e, name) => {
    if (name === 'title') {
      this.setState({ title: e.target.value })
    } else if (name === 'tags') {
      this.setState({ tags: e.target.value })
    } else if (name === 'description') {
      this.setState({ description: e.target.value })
    } else if (name === 'dropdown') {
      this.setState({ type: e.target.value })
    }
  }

  handleImageAdd = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState({
        uploadedImage: image,
        uploadedImageUrl: URL.createObjectURL(image),
      })
    } else {
      this.setState({
        uploadedImage: {},
        uploadedImageUrl: '',
      })
    }
  }

  savePost = () => {
    const component = this
    let location = null
    console.log(navigator.geolocation)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        timeout: 10000,
        enableHighAccuracy: true,
      })
    }

    function showPosition(position) {
      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      component.createPost(location)
    }

    function showError(error) {
      if (error.PERMISSION_DENIED) {
        console.log('The User has denied the request for Geolocation.')
      }
      component.createPost()
    }
  }

  createPost = (location) => {
    const { title, tags, description, type } = this.state
    const newPost = {}

    const formData = new FormData()
    formData.append('date', new Date())


    if (title) {
      formData.append('title', title)
    } else {
      console.log('title is required')
    }

    if (type) {
      formData.append('type', type)
    } else {
      console.log('type is required')
    }

    if (tags) {
      formData.append('tags', tags)
    }

    if (description) {
      formData.append('description', description)
      newPost.description = description
    }

    if (location) {
      formData.append('location', JSON.stringify(location))
      newPost.location = location
    }

    if(this.state.uploadedImage) {
      formData.append('image', this.state.uploadedImage)
    }

    this.props.createPost(formData)

    // window.location.href = '/profile';
  }

  resetPost = () => {
    this.setState(() => this.initialState)
  }

  render() {
    const { title, tags, description, type } = this.state
    return (
      <>
        <Typography classes={{ h5: 'page-heading' }} variant="h5">
          Create a new Post
        </Typography>
        <div className={'two-column-divider'}>
          <div className="half-width flex-column-half">
            <div className={'center-content-vertical'}>
              {!this.state.uploadedImageUrl.trim() ? (
                <FlowerPlaceholder />
              ) : (
                <img
                  src={this.state.uploadedImageUrl}
                  alt="Selected"
                  className="selected-image"
                />
              )}
              <input
                type="file"
                name="image"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={this.handleImageAdd}
                accept="image/png, image/gif, image/jpeg"
              />
              <Button
                variant={'contained'}
                containedButton={'contained-full-button half-width mt-24'}
                startIcon={<AddRoundedIcon />}
                handleClick={() => document.getElementById('file-upload').click()}
              >
                Add Image
              </Button>
            </div>
          </div>
          <div className="half-width flex-column-half">
            <FormInput
              name="Title"
              id="post-title"
              value={title}
              containerClass="inputWithMarginBottom"
              handleChange={(e) => this.handleChange(e, 'title')}
            />
            <InputLabel classes={{ root: 'form-input-label' }}>Type</InputLabel>
            <Dropdown
              data={[
                { name: 'Tree', value: 'tree' },
                { name: 'Flower', value: 'flower' },
                { name: 'Plant', value: 'plant' },
              ]}
              containerClass="dropdownWithMarginBottom"
              setDropdownValue={(e) => this.handleChange(e, 'dropdown')}
              value={type}
            />
            <Tags
              name="Tags"
              id="post-tags"
              value={tags}
              containerClass="inputWithMarginBottom"
              handleChange={(e) => this.handleChange(e, 'tags')}
            />
            <Description
              name="Description"
              id="post-description"
              value={description}
              handleChange={(e) => this.handleChange(e, 'description')}
            />
          </div>
        </div>
        <div className="newItem-actions">
          <Button
            containedButton={'contained-full-button quarter-width m-24'}
            handleClick={this.savePost}
          >
            Create Post
          </Button>
          <Button
            containedButton={'contained-outlined-button quarter-width m-24'}
            handleClick={this.resetPost}
          >
            Reset
          </Button>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActive: (page) => dispatch(uiActions.setActive(page)),
    createPost: (post) => dispatch(postActions.createPost(post)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewItems))
