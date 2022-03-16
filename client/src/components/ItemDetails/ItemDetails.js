import React, { useState } from 'react'
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'
import { Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Button from '../Button/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Modal from '../../components/Modal/Modal'
import CloseIcon from '@mui/icons-material/Close'
import ItemEdit from '../itemEdit/itemEdit'
import { useDispatch } from 'react-redux'
import * as chatActions from '../../actions/chatActions'

import './ItemDetails.scss'
import { IMAGE_ENDPOINT } from '../../utils/constants'
import { useHistory } from 'react-router-dom'

const ItemDetails = ({ props, onClose }) => {
  const [edit, setEdit] = useState(false)
  const [anchorE1, setAnchorE1] = useState(null)
  const open = Boolean(anchorE1)
  let closedMenu = false
  const history = useHistory()

  const dispatch = useDispatch()

  const handleMenuOpen = (event) => {
    if (!closedMenu) {
      setAnchorE1(event.currentTarget)
    }
    closedMenu = false
  }

  const handleClose = () => {
    setAnchorE1(null)
    closedMenu = true
  }
  
  const handleEdit = () => {
    setAnchorE1(null)
    setEdit(true)
  }
  
  const handleDelete = () => {
    console.log('delete')
    setAnchorE1(null)
  }

  const contactOwner = () => {
    dispatch(chatActions.contactUser(props, history))
    dispatch(chatActions.getChatDetails({ _id: props.user_id, contact: true }))
    onClose()
    setAnchorE1(null)
  }

  return (
    <div className="card">
      <div className="post-content">
        <div className="post-text">
          <Typography className="post-title">{props.title}</Typography>
          <Typography className="post-date">Posted on: {props.date}</Typography>
          <Typography className="post-desc">{props.description}</Typography>
        </div>

        <div className="post-image">
          {/* {props.self ? (
            <div className="post-option">
              <div className="post-option-button" onClick={handleMenuOpen}>
                <MoreHorizIcon />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorE1}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                <Modal
                  open={edit}
                  handleClose={() => setEdit(false)}
                  props={props}
                >
                  <ItemEdit props={props} onClose={() => setEdit(false)} />
                </Modal>
              </div>
            </div>
          ) : null} */}
          <div className="post-image">
            {props.image ? (
              <img src={IMAGE_ENDPOINT + '/' + props.image} alt="item" />
            ) : (
              <FlowerPlaceholder
                containerHeight="auto"
                containerWidth="100%"
                borderRadius="0px"
                width="20vw"
              />
            )}
          </div>
        </div>
      </div>
      <div className="post-buttons">
        {
          !props.self ?
            <Button
              containedButton={
                'contained-full-button quarter-width m-24 contact-button'
              }
            // handleClick={this.savePost}
            >
              Contact owner
              <SendIcon className="contact-owner-icon" />
            </Button> :
            <Button
              containedButton={
                'contained-delete-button quarter-width m-24 contact-button'
              }
              handleClick={() => props.deleteThis()}
            >
              Delete Item
              <DeleteOutlineIcon className="delete-icon" />
            </Button>
        }
        <Button
          containedButton={'contained-outlined-button quarter-width m-24'}
          handleClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export default ItemDetails
