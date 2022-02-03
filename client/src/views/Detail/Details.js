import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom'
import './details.scss'
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

export default function Details({ open, onClose, props }) {
    if (!open) {
        return null
    }
    else {
        return ReactDom.createPortal(
            <>
                <div className='overlay' onClick={onClose} />
                <div className='details'>
                    <div className="top">
                        {props.title}
                        <div className="cross">
                            <CloseIcon onClick={onClose} />
                        </div>
                    </div>
                    <div className="rest">
                        <div className="mid">
                            <div className="mid-left">
                                {props.description}
                                <div className="time">
                                    Posted on: {props.date}
                                </div>
                            </div>
                            <div className="mid-right">
                                <FlowerPlaceholder containerHeight='160px' containerWidth='160px' borderRadius='0px' />
                            </div>
                        </div>
                        <Link to="/chats" className="bottom">
                            <SendIcon />
                            <div className="bottom-text">
                                Contact Owner
                            </div>
                        </Link>
                    </div>
                </div>
            </>,
            document.getElementById('portal')
        );
    }
}
