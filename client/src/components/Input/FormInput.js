import { InputLabel, InputBase } from '@mui/material'

import './FormInput.scss'

const FormInput = ({
  containerClass,
  name,
  id,
  placeholder,
  value,
  handleChange,
  type,
  inputName,
  label,
}) => {
  return (
    <div className={containerClass ? containerClass : 'input-root'}>
      {label && label != false ?
        <InputLabel classes={{ root: 'form-input-label' }} htmlFor={id}>
          {name}
        </InputLabel> : null
      }
      <InputBase
        classes={{ input: 'form-input', root: 'input-root' }}
        onChange={handleChange}
        value={value}
        name={inputName}
        placeholder={placeholder ? placeholder : ''}
        type={type ? type : 'text'}
        id={id}
      />
    </div>
  )
}

export default FormInput
