import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import visitorService from '../services/visitorsService';

const initialState = {
    user: {},
    error: null,
    success: false,
    loading: false,
    message: null,
    visits: []
}

export const createVisitors = createAsyncThunk('user/visitors', async(user, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await visitorService.createVisitors(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
        
    } catch (error) {
        console.log(error);
    }

});

export const getAllMyVisitors = createAsyncThunk('user/my-visitors', async(user, thunkAPI) => {
    try {
        
        const token = thunkAPI.getState().auth.user.token;
        const data = await visitorService.getMyVisitors(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const deleteVisits = createAsyncThunk('user/delete', async(id, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await visitorService.deleteVisits(id, token);

        if(!data){
            return thunkAPI.rejectWithValue('Erro do deletar um visitante');
        }

        return id;
        
    } catch (error) {
        console.log(error);
    }
});

export const getAllVisitors = createAsyncThunk('user/all', async(_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await visitorService.getAllVisitors(token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})

export const visitorSlice = createSlice({
    name: 'visitors',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createVisitors.pending, (state) => {
            state.loading = null;
            state.error = null;
        })
        .addCase(createVisitors.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Visitante cadastrado com sucesso!'
        })
        .addCase(createVisitors.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null
        })
        .addCase(getAllMyVisitors.fulfilled, (state, action) => {
            state.loading = false;
            state.visits = action.payload; // Atualiza a lista de eventos
            state.error = null;
        })
        .addCase(getAllMyVisitors.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.visits = []; // Limpa a lista de eventos em caso de erro
        })
        .addCase(getAllVisitors.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllVisitors.fulfilled, (state, action) => {
            state.loading = false;
            state.visits = action.payload; // Atualiza a lista de eventos
            state.error = null;
        })
        .addCase(getAllVisitors.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.visits = []; // Limpa a lista de eventos em caso de erro
        })
        .addCase(deleteVisits.pending, (state) => {
            state.loading = null;
            state.error = null;
        })
        .addCase(deleteVisits.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Visitante removido com sucesso!'
            state.visits = state.visits.filter(visit => visit._id !== action.payload)
        })
        .addCase(deleteVisits.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})


export const { resetMessage } = visitorSlice.actions;
export default visitorSlice.reducer;