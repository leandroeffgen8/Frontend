import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reserveService from '../services/reserveServices';

const initialState = {
    error: null,
    success: false,
    loading: false,
    message: null,
    events: []
}

//CRIANDO UMA RESERVA
export const createReserve = createAsyncThunk('reserve/create', async(user, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await reserveService.createReserve(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
        
    } catch (error) {
        console.log(error);
    }
})

//RETORNA TODAS AS RESERVAS
export const getAllReserve = createAsyncThunk('reserve/all', async (_, thunkAPI) => {
    
    const token = thunkAPI.getState().auth.user.token;
    const data = await reserveService.getAllReserve(token); 

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

//RETORNA TODAS AS MINHAS RESERVAS
export const getMyReserve = createAsyncThunk('reserve/my-reservation', async(_, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token;
        const data = reserveService.getMyReserve(token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;

    } catch (error) {
        console.log(error);
    }
})

//DELETE RESERVA
export const deleteReserve = createAsyncThunk('reserve/delete', async(id, thunkAPI) => {

    try {
        
        const token = thunkAPI.getState().auth.user.token;
        const data = await reserveService.deleteReserve(id, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return id;        

    } catch (error) {
        console.log(error)
    }

})

export const reserveSlice = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createReserve.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createReserve.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Evento cadastrado com sucesso!';
        })
        .addCase(createReserve.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
        .addCase(getAllReserve.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllReserve.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload; // Atualiza a lista de eventos
            state.error = null;
        })
        .addCase(getAllReserve.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.events = []; // Limpa a lista de eventos em caso de erro
        })
        .addCase(getMyReserve.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload; // Atualiza a lista de eventos
            state.error = null;
        })
        .addCase(getMyReserve.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.events = []; // Limpa a lista de eventos em caso de erro
        })
        .addCase(deleteReserve.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteReserve.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Reserva excluída com sucesso!';
            state.events = state.events.filter(event => event._id !== action.payload);
        })
        .addCase(deleteReserve.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const {resetMessage} = reserveSlice.actions;
export default reserveSlice.reducer;