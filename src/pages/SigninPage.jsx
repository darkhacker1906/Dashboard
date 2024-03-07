import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Error from "../Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,provider} from "../Firebase";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { signInSchema } from "../schemas";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import EmailModal from "../components/EmailModal";


function SigninPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose=()=>{
    setOpen(false);
  }
  // const [openPhone,setOpenPhone]=useState(false);
  // const handlePhoneClose=()=>{
  //   setOpenPhone(false);
  // }
  const handleSigninWithPhone=()=>{
     navigate("/phonelogin")
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");
      } catch (e) {
        console.log("error in sigin in", e);
      }
      setLoading(false);
      resetForm();
    },
  });
 
  const handlePasswordChange=()=>{
    setOpen(true);
  }
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 ... flex justify-center items-center ">
      <div className="w-1/3 h-auto bg-white flex-row gap-4 p-7 min-w-80">
        <form onSubmit={handleSubmit}>
          <div className="text-center font-bold text-gray-900 text-2xl">
            Sign In
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email here"
            />
          </div>
          {errors.email && touched.email && <Error error={errors.email} />}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password here"
            />
          </div>
          {errors.password && touched.password && (
            <Error error={errors.password} />
          )}
          <div className="flex justify-start mt-3  relative w-full mb-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 ... p-2  text-gray-50 rounded-md w-full"
            >
              Sign in
            </button>
            {loading && (
              <div className="absolute w-full flex justify-center">
                <CircularProgress sx={{ color: "white" }} />
              </div>
            )}
          </div>
        </form>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
          <div><Typography onClick={handleSigninWithPhone} sx={{ '&:hover': {
      cursor:"pointer"
    },}}>Signin with phone</Typography></div>
          <div><Typography onClick={handlePasswordChange} sx={{ '&:hover': {
      cursor:"pointer"
    },}}>Forget Password</Typography></div>
       
        </Box>
        <div className=" flex  gap-1">
          Don't have account
          <NavLink
            to={"/signup"}
            style={{ fontWeight: "500", color: "#2993EB" }}
          >
            Sign up
          </NavLink>
        </div>
      </div>
      <EmailModal open={open} setOpen={setOpen} handleClose={handleClose}/>
    </div>
  );
}

export default SigninPage;
