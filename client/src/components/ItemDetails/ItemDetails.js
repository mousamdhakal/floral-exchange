import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'
import { Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Button from '../Button/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import './ItemDetails.scss'


const ItemDetails = ({ props, onClose }) => {
  return (
    <div className="card">
      <div className="post-content">
        <div className="post-text">
          <Typography className="post-title">{props.title}</Typography>
          <Typography className="post-date">
            Posted on: {props.date}
          </Typography>
          <Typography className="post-desc">{props.description}</Typography>
        </div>
        <div className="post-image">
          <FlowerPlaceholder
            containerHeight="auto"
            containerWidth="100%"
            borderRadius="0px"
            width="20vw"
          />
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
            // handleDelete ={this.deletePost}
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
    </div >
  )
}

export default ItemDetails