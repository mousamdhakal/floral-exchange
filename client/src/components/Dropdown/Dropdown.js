import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import './Dropdown.scss'


const Dropdown = ({ data, containerClass }) => {
  const [value, setValue] = useState(data[0].value)
  return (
    <div className={containerClass ? containerClass : 'dropdown-root'}>
      <Select
        value={value}
        classes={{root: 'dropdown'}}
        onChange={(e) => setValue(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {/* {data.forEach(option => {
          <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
        })} */}
        {data.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default Dropdown
