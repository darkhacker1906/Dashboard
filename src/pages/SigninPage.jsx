import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Error from "../Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,provider} from "../Firebase";
import { Box, Button, CircularProgress } from "@mui/material";
import { signInSchema } from "../schemas";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";


function SigninPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const handleGoogleSignIn = async () => {
    try {
      console.log('try ');
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
    setLoading(false);
  };
  
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
          <div className="flex justify-start mt-2  relative w-full">
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
          <Button fullWidth onClick={handleGoogleSignIn} sx={{display:'flex',alignItems:"center",mb:1,border:"1px solid #D1D5DB",borderRadius:3,mt:1 }}>
            Sign in with google
          <FcGoogle style={{fontSize:"25px",cursor:"pointer"}} />
          </Button>
         
        </form>
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
    </div>
  );
}

export default SigninPage;
