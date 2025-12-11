import { configureStore } from "@reduxjs/toolkit";

export default configureStore:configureStore({
    reducer:{
        blocks:blockReducer,
    }
})