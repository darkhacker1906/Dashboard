import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({
  deleteOpen,
  setDeleteOpen,
  handleDeleteClose,
  id,
  setProducts
}) {
    const [loading,setLoading]=React.useState(false);
    const handleDelete = async (id) => {
        setLoading(true); 
        try {
          const userDoc = doc(db, "products", id);
          await deleteDoc(userDoc);
          setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          handleDeleteClose();
        }
      };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={deleteOpen}
        onClose={handleDeleteClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={deleteOpen}>
          <Box sx={style}>
            <Typography sx={{textAlign:"center",mb:2}}>Do you want to delete</Typography>
            <Box sx={{display:"flex",justifyContent:"center",gap:2}}>
              <Box><Button variant="contained" onClick={()=>handleDelete(id)} sx={{position:"relative"}}>Confirm</Button></Box>
              {
                loading && <CircularProgress sx={{position:"absolute", display: "flex",
                justifyContent: "flex-start"}}/>
              }
             <Box> <Button variant="contained" onClick={() => handleDeleteClose()}>Cancel</Button></Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
