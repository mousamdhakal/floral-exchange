import { Typography } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

import * as uiActions from '../../actions/uiActions'
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'
import Button from '../../components/Button/Button'
import FormInput from '../../components/Input/FormInput'
import Dropdown from '../../components/Dropdown/Dropdown'
import { InputLabel } from '@mui/material'

export class NewItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  componentDidMount() {
    this.props.setActive('newItem')
  }

  handleChange = (e, name) => {
    if (name === 'title') {
      this.setState({ title: e.target.value })
    }
  }

  render() {
    const { title } = this.state
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
              handleChange={(e) => this.handleChange(e, 'title')}
            />
            <InputLabel classes={{ root: 'form-input-label' }}>
              Type
            </InputLabel>
            <Dropdown
              data={[
                { name: 'Tree', value: 'tree' },
                { name: 'Flower', value: 'flower' },
                { name: 'Plant', value: 'plant' },
              ]}
            />
          </div>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewItems))
