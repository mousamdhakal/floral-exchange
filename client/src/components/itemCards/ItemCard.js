import React, { useState } from 'react'

import './itemCards.scss'
import Modal from '../../components/Modal/Modal'
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import ItemDetails from '../ItemDetails/ItemDetails'
import { IMAGE_ENDPOINT } from '../../utils/constants';

const ItemCard = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="item-box">
      <div className="item-pic" onClick={() => setIsOpen(true)}>
        {props.image ? <img className='post-image' src={IMAGE_ENDPOINT +'/' + props.image} alt="item" /> : <FlowerPlaceholder
          containerHeight="125px"
          containerWidth="auto"
          borderRadius="0px"
        />}
        
      </div>
      <Modal open={isOpen} handleClose={() => setIsOpen(false)} props={props}>
        <ItemDetails props={props} onClose={() => setIsOpen(false)}/>
      </Modal>
      <div className="item-rest">
        <div className="item-desc">
          <div>
            <p className="item-title">{props.title}</p>
          </div>
          <div className="item-time">Posted on {props.date}</div>
        </div>
        <div className="item-action">
          <div className="item-like">
            <FavoriteBorderIcon />
          </div>
          <div className="item-comment">
            <MessageIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
