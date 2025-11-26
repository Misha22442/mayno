import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    const { data } = await axios.post('/auth/login', credentials);
    return data; // { username, role, fullName }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, isAuth: false },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;