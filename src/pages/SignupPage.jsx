import { useFormik } from "formik";
import React, { useState } from "react";
import Error from "../Error";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db} from "../Firebase";
import { signUpSchema } from "../schemas";
import { CircularProgress } from "@mui/material";
import { collection, addDoc } from "firebase/firestore"; 

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const navigate = useNavigate();
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
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        setLoading(false);
        navigate("/");
      } catch (e) {
        console.log("error message", e);
      }
      resetForm();
    },
  });

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="w-1/3 h-auto bg-white flex-row gap-4 p-4 min-w-80">
        <div className="text-center font-bold text-gray-900 text-2xl">
          Sign Up
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="name"
              name="name"
              value={values.name}
              id="name"
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your name here"
            />
          </div>
          {errors.name && touched.name && <Error error={errors.name} />}
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
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
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
              onBlur={handleBlur}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
            />
          </div>
          {errors.password && touched.password && (
            <Error error={errors.password} />
          )}
          <div>
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              onBlur={handleBlur}
              value={values.confirm_password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Confirm Password"
            />
          </div>
          {errors.confirm_password && touched.confirm_password && (
            <Error error={errors.confirm_password} />
          )}
          <div className="flex justify-center mt-2 relative">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-sm  text-gray-50"
            >
              Submit
            </button>
            {loading && (
              <div className="absolute ">
                <CircularProgress sx={{ color: "white" }} />
              </div>
            )}
          </div>
        </form>
        <NavLink to={"/"}>
          <p className="text-blue-500 font-medium">Sign in</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SignupPage;
