import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import assembleiaService from '../services/assembleiaService';

const initialState = {
    error: null,
    success: false,
    loading: false,
    message: null,
    assemblys: []
}

export const createAssembleia = createAsyncThunk('assembleia/create', async(user, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await assembleiaService.createAssembleia(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
        
    } catch (error) {
        console.log(error)
    }
})

export const getAllAssembly = createAsyncThunk('assembleia/getAll', async() => {
    
    const data = await assembleiaService.getAllAssembly();

    return data;
})

export const assembleiaSlice = createSlice({
    name: 'assembleia',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAssembleia.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAssembleia.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = 'Assembleia criada com sucesso'
            })
            .addCase(createAssembleia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllAssembly.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAssembly.fulfilled, (state, action) => {
                console.log('Payload recebido no fulfilled:', action.payload);
                state.loading = false;
                state.assemblys = action.payload; // Corrigido para usar 'assemblys'
                state.error = null;
            })
            .addCase(getAllAssembly.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.assemblys = []; 
            });
    }
});

export const { resetMessage } = assembleiaSlice.actions;
export default assembleiaSlice.reducer;