import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GlpModelViewer from "./../glbViewer/index";
import { useSpring, animated } from '@react-spring/web';
import CloseIcon from '@mui/icons-material/Close';
import "./index.css"
import Draco3DViewer from '../dracoViewer';
import USDZViewer from '../usdzViewer';
import OBJViewer from '../objViewer';
import FBXViewer from "./../fbxViewer"
import BlendViewer from '../blendViewer';

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
  width: "80%",
  height:"90%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal({open,setOpen,threeDType,title ,modelPath}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='modalTitleContainer'>
              <span className='modalTitle'>{title}</span>
              <CloseIcon className='closeIcon' fontSize="large" onClick={()=>handleClose()}/>
            </div>
          {threeDType ==="GLP" && <GlpModelViewer modelPath = {modelPath} />}
          {threeDType ==="GLTF" && <GlpModelViewer modelPath = {modelPath} />}
          {threeDType ==="USDZ" && <USDZViewer modelPath = {modelPath} />}
          {threeDType ==="DRACO" && <Draco3DViewer        modelPath = {modelPath} />}
          {threeDType ==="OBJ" && <OBJViewer modelPath = {modelPath} />}
          {threeDType ==="FBX" && <FBXViewer modelPath = {modelPath} />}
          {threeDType ==="BLEND" && <BlendViewer modelPath = {modelPath} />}

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}