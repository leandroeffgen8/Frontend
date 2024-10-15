import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import maintenanceService from "../services/maintenanceService";

const initialState = {
    error: null,
    success: false,
    loading: false,
    message: null,
    maintenances: []
}

export const createMaintenance = createAsyncThunk('create/maintenance', async(user, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await maintenanceService.createMaintenance(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
        
    } catch (error) {
        console.log(error);
    }
});

export const getAllMaintenance = createAsyncThunk('maintenance/all', async(user, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const data = await maintenanceService.getAllMaintenance(user, token);

    if(data.erros){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;

});

export const updateMaintenance = createAsyncThunk('maintenance/update', async({id, status}, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await maintenanceService.updateMaintenance(id, status, token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const maintenanceSlice = createSlice({
    name: 'maintenance',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(createMaintenance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMaintenance.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = 'Manutenção criada com sucesso.'
            })
            .addCase(createMaintenance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllMaintenance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMaintenance.fulfilled, (state, action) => {
                console.log('Payload recebido no fulfilled:', action.payload);
                state.loading = false;
                state.maintenances = action.payload;
                state.error = null;
            })
            .addCase(getAllMaintenance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.maintenances = [];
            })
            .addCase(updateMaintenance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMaintenance.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null; 
                state.message = 'Manutenção atualizada com sucesso';
               
                const index = state.maintenances.findIndex(maintenance => maintenance._id === action.payload._id);
                if (index !== -1) {
                    state.maintenances[index] = action.payload;
                }
            })
            .addCase(updateMaintenance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { resetMessage } = maintenanceSlice.actions;
export  default maintenanceSlice.reducer;