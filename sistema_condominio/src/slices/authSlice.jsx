import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../services/authService";


const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
}

export const registerUser = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    const data = await authServices.register(user)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
});

//Logout
export const logout = createAsyncThunk('auth/logout', async() => {
    await authServices.logout()
});

//Logando usuário
export const loginUser = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    const data = await authServices.login(user)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
});


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;