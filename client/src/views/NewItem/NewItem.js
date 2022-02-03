import { Typography } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Link } from 'react-router-dom'


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

  createPost = () => {
    const { title, tags, description, type } = this.state
    const newPost = {}
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const d = new Date();
    const day = d.getDate();
    const year = d.getFullYear();
    const date = `${months[d.getMonth()]} ${day}, ${year}`
    date.toString();

    newPost.date = date

    if (title) {
      newPost.title = title
    } else {
      console.log('title is required')
    }

    if (type) {
      newPost.type = type
    } else {
      console.log('type is required')
    }

    if (tags) {
      newPost.tags = tags
    }

    if (description) {
      newPost.description = description
    }

    this.props.createPost(newPost);

    window.location.href = '/profile';
  }
  resetPost = () => {
    this.setState(() => this.initialState);
  }

  render() {
    const { title, tags, description } = this.state
    return (
      <>
        <Typography classes={{ h5: 'page-heading' }} variant="h5">
          Create a new Post
        </Typography>
        <div className={'two-column-divider'}>
          <div className="half-width flex-column-half">
            <div className={'center-content-vertical'}>
              <FlowerPlaceholder />
              <Button
                variant={'contained'}
                containedButton={'contained-full-button half-width mt-24'}
                startIcon={<AddRoundedIcon />}
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
              value={this.state.value}
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
            handleClick={this.createPost}
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
