import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authServices';


const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    error: null,
    success: false,
    loading: false
}

// Registrar usuario
export const registerUser = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    const data = await authService.registerUser(user)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data
})

//Logout
export const logoutUser = createAsyncThunk('auth/logout', async() => {
    await authService.logoutUser()
});

//Logando usuário
export const loginUser = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    const data = await authService.loginUser(user)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false,
            state.error = null,
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
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
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
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

export const { reset } = authSlice.actions;
export default authSlice.reducer;