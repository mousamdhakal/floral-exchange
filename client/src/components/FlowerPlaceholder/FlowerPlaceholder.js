

const FlowerPlaceholder = ({containerHeight = '268px', containerWidth = '328px'}) => {
  return (
    <div className="flower-placeholder-container" style={{height: containerHeight, width: containerWidth}}>
      <img
        className="flower-placeholder"
        src="./assets/images/flower-placeholder.svg"
        alt="A flower"
      />
    </div>
  )
}

export default FlowerPlaceholder
