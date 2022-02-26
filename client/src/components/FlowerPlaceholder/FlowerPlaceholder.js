

const FlowerPlaceholder = ({containerHeight = '268px', containerWidth = '328px', borderRadius = '4px', width = 'auto'}) => {
  return (
    <div className="flower-placeholder-container" style={{height: containerHeight, width: containerWidth, borderRadius: borderRadius}}>
      <img
        className="flower-placeholder"
        src="./assets/images/flower-placeholder.svg"
        alt="A flower"
        style={{width: width}}
      />
    </div>
  )
}

export default FlowerPlaceholder
