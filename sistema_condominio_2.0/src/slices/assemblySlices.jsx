import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import assemblyService from '../services/assemblyServices';

const initialState = {
    error: null,
    success: false,
    loading: false,
    message: null,
    assemblys: []
}

//CRIAR UMA AGENDA PARA A ASSENBLEIA
export const createAssembly = createAsyncThunk('assembly/create', async(user, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await assemblyService.createAssembly(user, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
        
    } catch (error) {
        console.log(error)
    }
});

//RETORNA TODAS AS DATAS DE ASSEMBLEIAS
export const getAllAssembly = createAsyncThunk('assembly/all', async() => {
    
    const data = await assemblyService.getAllAssembly();
    return data;

})

export const assemblySlice = createSlice({
    name: 'assembly',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createAssembly.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createAssembly.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Assembleia criada com sucesso'
        })
        .addCase(createAssembly.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllAssembly.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllAssembly.fulfilled, (state, action) => {
            state.loading = false;
            state.assemblys = action.payload;
            state.error = null;
        })
        .addCase(getAllAssembly.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.assemblys = []; 
        });
    }
});

export const { resetMessage } = assemblySlice.actions;
export default assemblySlice.reducer;