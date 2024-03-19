
import React from "react"

const authContext = React.createContext({
   token:null,
   userLoggedIn:false,
   login:()=>{},
   logout:()=>{}
 })
 export default authContext