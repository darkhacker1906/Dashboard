import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../Firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "@mui/icons-material";

function SignInWithPhone() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading,setLoading]=useState(false);
  const[otpLoading,setOtpLoading]=useState(false);
  const sendOtp = async () => {
    setLoading(true);
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirmation);
    } catch (e) {
      console.log(e);
    }finally{
      setLoading(false);
    }
  };
  const verifyOtp = async () => {
    try {
      setOtpLoading(true);
      const data = await user.confirm(otp);
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }finally{
      setOtpLoading(false)
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 ... flex justify-center items-center ">
     <NavLink to={"/"}> <Button variant="contained"sx={{position:"absolute",top:0,left:0}}>Go Back</Button></NavLink>
      <Box>
        <form onSubmit={(e) => e.preventDefault()}>
          <PhoneInput
            country={"us"}
            onChange={(phone) => setPhone("+" + phone)}
            value={phone}
            name="phone"
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 ,position:"relative"}}
            onClick={() => sendOtp()}
          >
            Send otp
            {loading && (
              <div className="absolute">
                <CircularProgress sx={{ color: "white"}} size={27}/>
              </div>)}
          </Button>
          <div
            style={{ marginTop: "10px", marginBottom: 2 }}
            id="recaptcha"
          ></div>
          <label htmlFor="otp">Enter otp</label>
          <br />
          <TextField
            size="small"
            onChange={(e) => setOtp(e.target.value)}
            variant="outlined"
            value={otp}
            sx={{
              mb: 2,
              background: "#ffffff",
              borderRadius: 2,
              width: "90%",
              "&:hover": {
                border: "none",
              },
            }}
            id="otp"
          />
          <Button variant="contained" onClick={verifyOtp}
           >
            Enter otp
            {otpLoading && (
            <div className="absolute">
              <CircularProgress sx={{ color: "white"}} size={27}/>
            </div>)}
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default SignInWithPhone;
