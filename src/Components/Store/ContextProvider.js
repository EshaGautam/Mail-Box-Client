import authContext from "./Context";

import React, { useState } from 'react'

const ContextProvider = (props) => {
 const [contentState, setContentState] = useState("");
    const[token,setToken] = useState(null)
    const[userEmail,setUserEmail] = useState('')
  
     
    const userLoggedIn = !!token

    const login=(id)=>{
      
      setToken(id)
     localStorage.setItem('token',id)
      

    }

const handleEmail=(email)=>{
let clearedEmail = email.replace(/[.@]/g, "");
    setUserEmail(clearedEmail);
   localStorage.setItem("userEmail", clearedEmail);
}

    const handleContent =(content)=>{
      setContentState(content)
    }

    const auth ={
        token,
        userLoggedIn,
        login,
        userEmail,
        contentState,
        handleContent,
        handleEmail
        
    }

  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
}

export default ContextProvider