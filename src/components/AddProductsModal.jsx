import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";

export default function AddProductsModal({
  productOpen,
  setProductOpen,
  productClose,
}) {
  const [loading, setLoading] = React.useState(false);
  const initialValues = {
    product: "",
    model: "",
    price: "",
  };

  const { values, handleChange, resetForm, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const docRef = await addDoc(collection(db, "products"), {
          product: values.product,
          model: values.model,
          price: values.price,
        });
        console.log("Document written with ID: ", docRef.id);
        resetForm();
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        setLoading(false);
        productClose();
      }
      resetForm();
    },
  });
  return (
    <Dialog
      open={productOpen}
      onClose={productClose}
      PaperProps={{ sx: { width: "35%" } }}
    >
      <Typography sx={{ fontSize: 30, fontWeight: 500, textAlign: "center" }}>
        Add Products
      </Typography>
      <DialogContent>
        <DialogContentText>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              required
              margin="dense"
              id="product"
              name="product"
              label="Add product"
              value={values.product}
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="model"
              name="model"
              label="Enter model"
              value={values.model}
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              value={values.price}
              label="Enter price"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 2 }}
            >
              {" "}
              <Box>
                {" "}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ position: "relative", background: "#65659D" }}
                >
                  Submit
                  {loading && (
                    <CircularProgress
                      size={28} 
                      sx={{
                        position: "absolute",
                        color:"white"
                      }}
                    />
                  )}
                </Button>
              </Box>
              <Box>
                {" "}
                <Button
                  variant="contained"
                  onClick={productClose}
                  sx={{ background: "#65659D" }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
