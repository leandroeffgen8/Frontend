import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from '../services/notificationService';

const initialState = {
    user: {},
    error: null,
    success: false,
    loading: false,
    message: null,
    notifications: []
}

export const createNotification = createAsyncThunk('user/notifications', async(user, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await notificationService.createNotification(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
        
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('Erro ao registrar uma notificação.')
    }

});

export const getAllNotification = createAsyncThunk('user/all', async(_, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const data = await notificationService.getAllNotification(token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
})

export const infoSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(createNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNotification.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = 'Notificação cadastrada com sucesso.'
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllNotification.fulfilled, (state, action) => {
                console.log('Payload recebido no fulfilled:', action.payload);
                state.loading = false;
                state.notifications = action.payload; // Corrigido para usar 'notifications'
                state.error = null;
            })
            .addCase(getAllNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.notifications = []; // Corrigido para usar 'notifications'
            });
    }
})

export const { resetMessage } = infoSlice.actions;
export default infoSlice.reducer;