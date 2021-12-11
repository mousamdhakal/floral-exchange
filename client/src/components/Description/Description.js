import { InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField'
import './Description.scss'

const Description = ({
  containerClass,
  name,
  id,
  placeholder,
  value,
  handleChange,
  type,
}) => {
  return (
    <>
      <InputLabel classes={{ root: 'form-input-label' }} htmlFor={id}>
        {name}
      </InputLabel>
      <div className={containerClass ? containerClass : 'multiline-outer'}>
        <TextField
          id={id}
          label=""
          multiline
          rows={4}
          maxRows={6}
          value={value}
          onChange={handleChange}
          inputProps={{
              className: 'multiline-input'
          }}
          classes={{root: 'multiline-root'}}
          placeholder={placeholder ? placeholder : ''}
          type={type ? type : 'text'}
        />
      </div>
    </>
  )
}

export default Description
