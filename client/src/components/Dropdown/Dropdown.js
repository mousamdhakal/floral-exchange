import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import './Dropdown.scss'

const Dropdown = ({ data, containerClass, setDropdownValue, value }) => {
  const handleChange = (e) => {
    if (setDropdownValue) {
      setDropdownValue(e)
    }
  }

  return (
    <div className={containerClass ? containerClass : 'dropdown-root'}>
      <Select
        value={value}
        classes={{ root: 'dropdown' }}
        onChange={handleChange}
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
