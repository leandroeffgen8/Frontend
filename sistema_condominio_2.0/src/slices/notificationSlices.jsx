import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from '../services/notificationServices';

const initialState = {
    error: null,
    success: false,
    loading: false,
    message: null,
    notifications: []
}

//CRIA UMA NOTIFICAÇÃO
export const createNotification = createAsyncThunk('information/create', async(user, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await notificationService.createNotification(user, token)
        
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;

    } catch (error) {
         console.log(error);
    }
});

//RETORNA TODA AS NOTIFICAÇÕES
export const getAllNotification = createAsyncThunk('information/all', async(_, thunkAPI) => {
    
    const token = thunkAPI.getState().auth.user.token;
    const data = await notificationService.getAllNotification(token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
})

//ATUALIZA NOTIFICAÇÃO
export const updateNotification = createAsyncThunk('information/update', async({id, title, message}, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const data = await notificationService.updateNotification(id, {title, message}, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data

})

//DELETA NOTIFICAÇÂO
export const deleteNotification = createAsyncThunk('information/delete', async(id, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await notificationService.deleteNotification(id, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return id;        
        
    } catch (error) {
        console.log(error);
    }
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
            state.loading = false;
            state.notifications = action.payload; // Corrigido para usar 'notifications'
            state.error = null;
        })
        .addCase(getAllNotification.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.notifications = []; // Corrigido para usar 'notifications'
        })
        .addCase(updateNotification.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateNotification.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null; 
            state.message = 'Notificação atualizada com sucesso';
            const index = state.notifications.findIndex(notification => notification._id === action.payload._id);
            if (index !== -1) {
                state.notifications[index] = action.payload;
            }
        })
        .addCase(updateNotification.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteNotification.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteNotification.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Notificação excluída com sucesso!';
            state.notifications = state.notifications.filter(notification => notification._id !== action.payload);
        })
        .addCase(deleteNotification.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })  
    }
})

export const { resetMessage } = infoSlice.actions;
export default infoSlice.reducer;