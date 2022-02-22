import React, { useState } from 'react';

import './itemCards.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageIcon from '@mui/icons-material/Message';
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'
import Details from '../../views/Detail/Details'

const ItemCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="item-box">
            <div className="item-pic" onClick={() => setIsOpen(true)}>
                <FlowerPlaceholder containerHeight='125px' containerWidth='auto' borderRadius='0px' />
            </div>
            <Details
                open={isOpen}
                onClose={() => setIsOpen(false)}
                props={props}
            />

            <div className="item-rest">
                <div className="item-desc">
                    <div>
                        <p className="item-title">{props.title}</p>
                    </div>
                    <div className="item-time">
                        Posted on {props.date}
                    </div>
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

export default ItemCard;
