import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import CloseIcon from '@mui/icons-material/Close';
import Loader from "../Loaders";
import "./index.css"

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "45%",
  height:"60%",
  minWidth:"930 px",
  minHeight:"640 px",
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal({isOpenModal,setIsModalopen,modelData,renderer,loader}) {
  
  const handleClose = () => {
    renderer.dispose();
    // renderer.forceContextLoss();
    setIsModalopen(false);
  }
  return (
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className="modal"
        open={isOpenModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={isOpenModal}>
          <Box sx={style}>
            <div className='modalTitleContainer'>
              <span className='modalTitle'>{modelData?.modalTitle}</span>
              <div className='closeIconConatiner closeIcon' onClick={()=>handleClose()}>
                <CloseIcon  fontSize="large"/>
              </div>
            </div>
            <Loader modelData = {modelData}  forPreview={false} isOpenModal={isOpenModal}  renderer={renderer} loader={loader}/>
          </Box>
        </Fade>
      </Modal>
  );
}