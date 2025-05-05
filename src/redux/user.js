import { createSlice } from "@reduxjs/toolkit";

let userSlice = createSlice({
    name : "user" ,
    initialState : {
        token : ""
    } ,
    reducers : {
        onTokenchange : (state,action) => {
            state.token = action.payload
        }
    }
})

export const {onTokenchange} = userSlice.actions
export default userSlice.reducer