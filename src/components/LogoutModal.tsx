import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius:5,
  p: 4,
};
interface LogoutModalProps {
  logoutOpen: boolean;
  setLogoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

const LogoutModal:React.FC<LogoutModalProps>=({
  logoutOpen,
  setLogoutOpen,
  handleClose,
})=> {
  const navigate=useNavigate();
  const handleConfirm=()=>{
      localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogoutOpen(false);
     navigate("/");
  }
  const handleCancel=()=>{
  setLogoutOpen(false);
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={logoutOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={logoutOpen}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              sx={{ fontWeight: "600", textAlign: "center" }}
              component="h2"
            >
              Do you want to logout
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 1 }}
            >
              <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
              <Button variant="contained" onClick={handleCancel}>Cancel</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default LogoutModal