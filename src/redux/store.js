import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";

let store = configureStore({
    reducer : {
        user : userSlice
    }
})

export default store