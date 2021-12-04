import { InputLabel, InputBase, containerClasses } from '@mui/material'

import './Tags.scss'

const Tags = ({
  containerClass,
  name,
  id,
  placeholder,
  value,
  handleChange,
  type
}) => {
  return (
    <div className={containerClass ? containerClass : 'input-root'}>
      <InputLabel classes={{ root: 'form-input-label' }} htmlFor={id}>
        {name}
      </InputLabel>
      <InputBase
        classes={{ input: 'form-input', root: 'input-root' }}
        onChange={handleChange}
        value={value}
        placeholder={placeholder ? placeholder : ''}
        type={type ? type: 'text'}
        id={id}
      />
    </div>
  )
}

export default Tags
