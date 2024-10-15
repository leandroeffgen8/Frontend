import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import incidentService from '../services/incidentsServices';

const initialState = {
    error: null,
    success: false,
    loading: false, 
    message: null,
    incidents: []
}

//CRIA UMA NOTA DE INCIDENTE
export const createIncident = createAsyncThunk('incident/create', async(user, thunkAPI) => {

    try {
        
        const token = thunkAPI.getState().auth.user.token;
        const data = await incidentService.createIncident(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;

    } catch (error) {
        console.log(error);
    }

})

//RETORNA TODAS AS NOTAS DE INCIDENTES
export const getllIncidents = createAsyncThunk('incident/all', async(_, thunkAPI) => {
    
    const token = thunkAPI.getState().auth.user.token;
    const data = await incidentService.getllIncidents(token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

//ATUALIZA STATUS DO INCIDENTE
export const updateIncidentStatus = createAsyncThunk('incident/updateStatus', async({ id, status }, thunkAPI) => {
   
    const token = thunkAPI.getState().auth.user.token;
    const data = await incidentService.updateIncidentStatus(id, status, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

//RETORNA TODAS AS NOTAS DE INCIDENTE DO USUÁRIO
export const getMyIncidents = createAsyncThunk('incident/my-incidents', async(_, thunkAPI) => {
    try {
        
        const token = thunkAPI.getState().auth.user.token;
        const data = await incidentService.getMyIncidents(token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;

    } catch (error) {
        console.log(error);
    }
});

//DELETA UMA NOTA DE INCIDENTE
export const deleteIncidents = createAsyncThunk('incident/delete', async({ id, status }, thunkAPI) => {
    try {
        
        const token = thunkAPI.getState().auth.user.token;
        const data = await incidentService.deleteIncidents(id, status, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return id;

    } catch (error) {
        console.log(error)
    }
});

export const incidentSlice = createSlice({
    name: 'incident',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(createIncident.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createIncident.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Incidente cadastrado com sucesso.'
        })
        .addCase(createIncident.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getllIncidents.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getllIncidents.fulfilled, (state, action) => {
            state.loading = false;
            state.incidents = action.payload;
            state.error = null;
        })
        .addCase(getllIncidents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.incidents = [];
        })
        .addCase(updateIncidentStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateIncidentStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null; 
            state.message = 'Incidente atualizado com sucesso';
            const index = state.incidents.findIndex(incident => incident._id === action.payload._id);
            if (index !== -1) {
                state.incidents[index] = action.payload;
            }
        })
        .addCase(updateIncidentStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getMyIncidents.fulfilled, (state, action) => {
            state.loading = false;
            state.incidents = action.payload; // Atualiza a lista de incidents
            state.error = null;
        })
        .addCase(getMyIncidents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.incidents = []; // Limpa a lista de incidents em caso de erro
        })
        .addCase(deleteIncidents.pending, (state) => {
            state.loading = null;
            state.error = null;
        })
        .addCase(deleteIncidents.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Incidente removido com sucesso!'
            state.incidents = state.incidents.filter(incident => incident._id !== action.payload)
        })
        .addCase(deleteIncidents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { resetMessage } = incidentSlice.actions;
export default incidentSlice.reducer;