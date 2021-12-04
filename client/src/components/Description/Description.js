import { InputLabel, InputBase, containerClasses } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Description.scss';

const Description = ({
    containerClass,
    name,
    id,
    placeholder,
    value,
    handleChange,
    type
}) => {
    return (
        <>
            <div className={containerClass ? containerClass : 'input-root'}>
                <TextField
                    id={id}
                    label=""
                    multiline
                    maxRows={6}
                    value={value}
                    onChange={handleChange}
                    classes={{ input: 'form-input', root: 'input-root' }}
                    placeholder={placeholder ? placeholder : ''}
                    type={type ? type: 'text'}
                />
            </div>
        </>
    )
}

export default Description