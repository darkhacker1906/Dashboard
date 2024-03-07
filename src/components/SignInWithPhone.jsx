import { Box, Button } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../Firebase";

function SignInWithPhone() {
   const initialValues={
    phoneNo:'',
   }
   const {values,handleSubmit,setFieldValue}=useFormik({
    initialValues:initialValues,
    onSubmit:async(values)=>{
        try{
            const recaptcha=new RecaptchaVerifier(auth,"recaptcha",{size:"invisible"});
            const confirmation= await signInWithPhoneNumber(auth,values.phoneNo,recaptcha);
            console.log(confirmation);
        }catch(e){
       console.log(e);
        }
    }
   })
   
   const handlePhoneChange = (phone) => {
    setFieldValue("+"+"phoneNo", phone);
   };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 ... flex justify-center items-center ">
      <Box>
        <form onSubmit={handleSubmit}>
          <PhoneInput country={"us"} onChange={handlePhoneChange} value={values.phoneNo}/>
          <Button variant="contained" type="submit" sx={{mt:2}}>Send otp</Button>
        </form>
      </Box>
    </div>
  );
}

export default SignInWithPhone;
