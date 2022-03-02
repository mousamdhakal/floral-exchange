import React, { useState } from 'react'

import './itemCards.scss'
import Modal from '../../components/Modal/Modal'
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';


import ItemDetails from '../ItemDetails/ItemDetails'

const ItemCard = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="item-box">
      <div className="item-pic" onClick={() => setIsOpen(true)}>
        <FlowerPlaceholder
          containerHeight="125px"
          containerWidth="auto"
          borderRadius="0px"
        />
      </div>
      <Modal open={isOpen} handleClose={() => setIsOpen(false)} props={props}>
        <ItemDetails props={props} onClose={() => setIsOpen(false)} />
      </Modal>
      <div className="item-rest">
        <div className="item-desc">
          <div>
            <p className="item-title">{props.title}</p>
          </div>
          <div className="item-time">Posted on {props.date}</div>
        </div>
        <div className="item-action">
          {
            !props.self ? <div>
              <div className="item-like">
                <FavoriteBorderIcon />
              </div>
              <div className="item-comment">
                <MessageIcon />
              </div>
            </div> :

              <div className="item-delete">
                <DeleteIcon
                  style={{
                    color: '#b22222',
                  }}
                />
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ItemCard
