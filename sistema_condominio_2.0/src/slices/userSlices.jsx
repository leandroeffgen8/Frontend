import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userServices";

const initialState = {
    user: {},
    error: null,
    success: false,
    loading: false,
    message: null,
    moradores: []
}

// RETORNA OS DADOS DO USUÁRIO
export const profile = createAsyncThunk('user/profile', async(user, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.profile(user, token)

    return data;
});

//RETORNA TODOS OS USUÁRIOS
export const getUserAll = createAsyncThunk('user/all', async(user, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.getUserAll(user, token);

    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})

// ATUALIZA OS DADOS DO USUÁRIO
export const updateProfile = createAsyncThunk('user/update', async(user, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.updateProfile(user, token);

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(getUserAll.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserAll.fulfilled, (state, action) => {
            state.loading = false;
            state.moradores = action.payload; 
            state.error = null;
        })
        .addCase(getUserAll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.moradores = []; 
        })
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            state.message = 'Usuário atualizado com sucesso'
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        })
    }
})

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;