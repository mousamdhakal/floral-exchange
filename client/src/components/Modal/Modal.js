import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import './Modal.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline: 'none',
  borderRadius: '10px'
}

const ModalComponent = ({ open, handleClose, props, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
       {children}
      </Box>
    </Modal>
  )
}

export default ModalComponent
