import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice'
import mailReducer from './MailDataSlice'


const storeConfig = {
    reducer:{
     auth:authReducer,
     mail:mailReducer
    }
}

const Store = configureStore(storeConfig)
export default Store