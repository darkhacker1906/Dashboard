import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import Error from "../Error";
import { emailModalSchema } from "../schemas";
import { auth } from "../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  width: "33%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function EmailModal({ open, setOpen, handleClose }) {
    const [loading,setLoading]=React.useState(false);
  const initialValues = {
    email: "",
  };
  const { handleSubmit, values, handleBlur, handleChange, errors, touched,resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: emailModalSchema,
      onSubmit: (values) => {
        setLoading(true);
        sendPasswordResetEmail(auth, values.email)
          .then(() => {
            // alert("Password reset email sent");
            setLoading(false);
            setOpen(false);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Email sent successfully",
                showConfirmButton: false,
                timer: 1500
              });
            resetForm();
          })
          .catch((error) => {
            alert(error);
            setLoading(false);
            setOpen(false);
            resetForm();
          })

      },
    });
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{
                textAlign: "center",
                mb: 2,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Reset Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="Enter your email"
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
                onBlur={handleBlur}
                sx={{ mb: 2 }}
              />
              {errors.email && touched.email && <Error error={errors.email} />}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" type="submit" sx={{position:""}}>
                  Send
                </Button>
                {loading && (
              <div className="absolute w-full flex justify-center">
                <CircularProgress sx={{ color: "white" }} />
                </div>
                )}
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
