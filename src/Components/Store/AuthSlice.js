import { createSlice } from "@reduxjs/toolkit";


const existingUserEmail = localStorage.getItem('userEmail')
const existingToken = localStorage.getItem('token')

const authState = {
    token:existingToken,
    userEmail:existingUserEmail,
    userLoggedIn:!!existingToken
}


const AuthSlice = createSlice({
    name:'auth',
    initialState:authState,
    reducers:{
        login(state,action){
            console.log(action.payload)
            state.token=action.payload
            state.userLoggedIn=!!state.token
            localStorage.setItem('token',action.payload)
        }
        ,
        setUserEmail(state,action){
            console.log(action.payload)
            const clearedEmail = action.payload.replace(/[.@]/g, "")
            state.userEmail=clearedEmail
            localStorage.setItem('userEmail',clearedEmail)
        },
        logout(){
            localStorage.clear()
        }
    }
})


export const authAction = AuthSlice.actions
export default AuthSlice.reducer
