import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userReserve from '../services/reserveService';

const initialState = {
    error: null,
    success: false,
    loading: false,
    message: null,
    events: [],
}

export const createReserve = createAsyncThunk('reserve/create', async(user, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userReserve.createReserve(user, token);
        
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        
        return data;

    } catch (error)  {
        console.error(error);
    }

});

export const getAllReserve = createAsyncThunk('reserve/all', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userReserve.getAllReserve(token); 

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

export const getAllReservation = createAsyncThunk('reserve/my-reservations', async(_, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userReserve.getAllReservation(token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        
        return data;

    } catch (error) {
        console.error(error);
    }
});

export const deleteReservation = createAsyncThunk('reserve/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const result = await userReserve.deleteReservation(id, token);
        
        if (!result) {
            return thunkAPI.rejectWithValue('Erro ao deletar reserva');
        }
        
        return id; 

    } catch (error) {
        console.error(error);
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
        .addCase(getAllReservation.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload; // Atualiza a lista de eventos
            state.error = null;
        })
        .addCase(getAllReservation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.events = []; // Limpa a lista de eventos em caso de erro
        })
        .addCase(deleteReservation.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteReservation.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Reserva excluída com sucesso!';
            state.events = state.events.filter(event => event._id !== action.payload);
        })
        .addCase(deleteReservation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const {resetMessage} = reserveSlice.actions;
export default reserveSlice.reducer;