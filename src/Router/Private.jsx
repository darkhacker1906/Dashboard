import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';

function Private({ Component }) {
  const navigate = useNavigate();
  const [isLogged,setIsLogged]=useState(false);

  const checkUserToken=()=>{
    const userToken=localStorage.getItem("token");
    if(userToken){
      setIsLogged(true);
      navigate("/dashboard");
    }
    else{
      setIsLogged(false);
      navigate("/");
    }
  }
  useEffect(()=>{
    checkUserToken();
  },[isLogged]);

  return(
    <>
    <Component/>
    </>
  )
}

export default Private;
