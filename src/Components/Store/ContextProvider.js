import authContext from "./Context";

import React, { useState } from 'react'

const ContextProvider = (props) => {

    const[token,setToken] = useState(null)
     
    const userLoggedIn = !!token

    const login=(id)=>{
        setToken(id)
        localStorage.setItem('token',id)
    }
  

    const auth ={
        token,
        userLoggedIn,
        login,
        
    }

  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
}

export default ContextProvider