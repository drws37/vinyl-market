import { createAsyncThunk } from "@reduxjs/toolkit";
import type { StateAuth, User } from "./type";

const initialState:StateAuth = {user:null, message:''}

export const authRegistration = createAsyncThunk('auth/registration', 
(obj:User) => api)