import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Login } from "@mui/icons-material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
interface EditModalProps {
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  handleEditClose: () => void;
  editData: {
    product: string;
    model: string;
    price: string;
    id: string;
  };
}

export default function EditModal({ editOpen, setEditOpen, handleEditClose,editData}:EditModalProps) {
  const [loading,setLoading]=React.useState(false);
  const initialValues={
    product: editData.product || "",
      model: editData.model || "",
      price: editData.price || "",
  }
  const {handleBlur,handleSubmit,handleChange,errors,values,setValues,resetForm}=useFormik({
    initialValues:initialValues,
    onSubmit:async(values)=>{
      setLoading(true);
      const docRef=doc(db,"products",editData.id);
      const data={
        product:values.product,
        model:values.model,
        price:values.price,
      }
      try{
  await setDoc(docRef,data);
      }catch(e){
        console.log(e);
      }finally{
        resetForm();
        handleEditClose();
        setLoading(false);
      }
    }
  })
  React.useEffect(() => {
    setValues({
      product: editData.product || "",
      model: editData.model || "",
      price: editData.price || "",
    });
  }, [editData]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editOpen}
        onClose={handleEditClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={editOpen}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              sx={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
            >
              Edit Data
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="product"
                label="Product"
                variant="standard"
                name="product"
                value={values.product || editData.product}
                fullWidth
                sx={{ mb: 1 }}
                onChange={handleChange}
              />
              <TextField
                id="model"
                label="Model"
                variant="standard"
                name="model"
                value={values.model || editData.model}
                fullWidth
                onChange={handleChange}
                sx={{ mb: 1 }}
              />
              <TextField
                id="price"
                label="Price"
                variant="standard"
                name="price"
                value={values.price || editData.price}
                fullWidth
                onChange={handleChange}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                {/* <Button variant="contained" sx={{ width: "100px" }} type="submit" >
                  Update
                </Button> */}
                 <Button
                  type="submit"
                  variant="contained"
                  sx={{ position: "relative", background: "#65659D",width:"100px" }}
                >
                 Submit
                  {loading && (
                    <CircularProgress
                      // size={28} 
                      sx={{
                        position: "absolute",
                        color:"white"
                      }}
                    />
                  )}
                </Button>
                <Button variant="contained" sx={{ width: "100px" }} onClick={()=>handleEditClose()}>
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
