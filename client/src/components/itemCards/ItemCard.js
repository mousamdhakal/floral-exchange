import './itemCards.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageIcon from '@mui/icons-material/Message';
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'

const ItemCard = (props) => {
    return (
        <div className="item-box">
            <div className="item-pic">
                <FlowerPlaceholder containerHeight='125px' containerWidth='auto' borderRadius='0px'/>
            </div>
            <div className="item-rest">
                <div className="item-desc">
                    <div>
                        <p className="item-title">{props.title}</p>
                    </div>
                    <div className="item-time">
                        <p>this is time</p>
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
