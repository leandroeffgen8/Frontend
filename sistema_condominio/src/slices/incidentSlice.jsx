import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import incidentService from '../services/incidentService'; 

const initialState = {
    user: {},
    error: null,
    success: false,
    loading: false,
    message: null,
    incidents: []
}

export const registerIncident = createAsyncThunk('user/incidents', async(user, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await incidentService.registerIncident(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
        
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('Erro ao registrar incidente.'); // Retorna uma mensagem de erro consistente
    }
});

export const getMyIncidents = createAsyncThunk('user/my-incidents', async(_, thunkAPI) => {
    try {
        
        const token = thunkAPI.getState().auth.user.token;
        const data = await incidentService.getMyIncidents(token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;

    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('Erro ao registrar incidente.'); // Retorna uma mensagem de erro consistente
    }
});

export const geAllIncidents = createAsyncThunk('user/all', async(_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await incidentService.geAllIncidents(token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

export const updateIncidentStatus = createAsyncThunk('incident/updateStatus', async({ id, status }, thunkAPI) => {
   
    const token = thunkAPI.getState().auth.user.token;
    const data = await incidentService.updateIncidentStatus(id, status, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data

})

export const deleteIncidents = createAsyncThunk('incident/delete', async({ id, status }, thunkAPI) => {
    try {
        
        const token = thunkAPI.getState().auth.user.token;
        console.log('TOKEN:', token);
        console.log('ID:', id);
        console.log('STATUS:', status);
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
        .addCase(registerIncident.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerIncident.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Ocorrência cadastrada com sucesso';
        })
        .addCase(registerIncident.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
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
        .addCase(geAllIncidents.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(geAllIncidents.fulfilled, (state, action) => {
            state.loading = false;
            state.incidents = action.payload;
            state.error = null;
        })
        .addCase(geAllIncidents.rejected, (state, action) => {
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
            state.message = 'Ocorrência atualizada com sucesso';
            // Atualiza o incidente na lista local
            const index = state.incidents.findIndex(incident => incident._id === action.payload._id);
            if (index !== -1) {
                state.incidents[index] = action.payload;
            }
        })
        .addCase(updateIncidentStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
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
export default incidentSlice.reducer