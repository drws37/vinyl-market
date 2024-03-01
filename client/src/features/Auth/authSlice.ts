import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { StateAuth, User, UserWithoutNameAndRpasswordAndRole } from "./type";
import * as api from './api'

const initialState:StateAuth = {user:null, message:''}

export const authRegistration = createAsyncThunk('auth/registration', 
(obj:User) => api.registrationFetch(obj))

export const authLogin = createAsyncThunk('auth/login', 
(obj:UserWithoutNameAndRpasswordAndRole) => api.loginFetch(obj))

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(authRegistration.fulfilled,(state, action) =>
        {
            state.user=action.payload
            state.message = ''
        })
        .addCase(authRegistration.rejected,(state, action) => {
            state.message=action.error.message
        })
        .addCase(authLogin.fulfilled,(state, action) => {
            state.user = action.payload
            state.message = ''
        })
        .addCase(authLogin.rejected,(state, action) => {
            state.message=action.error.message
        })

    }
})

export default authSlice.reducer;