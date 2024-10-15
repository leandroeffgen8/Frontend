import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carService from "../services/carServices";

const initialState = {
    error: null,
    success: false,
    loading: false,
    message: null,
    cars: []
}

//ADICIONA PLACA DO CARRO
export const createCar = createAsyncThunk('car/create', async(user, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await carService.createCar(user, token)
        
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;

    } catch (error) {
         console.log(error);
    }
});

//RETORNA TODAS OS CARROS CADASTRADOS DO USUÁRIO
export const getMyCars = createAsyncThunk('car/my-cars', async(_, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token;
        const data = carService.getMyCars(token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;

    } catch (error) {
        console.log(error);
    }
})

//ATUALIZAR DADOS DO CARRO
export const updateCar = createAsyncThunk('car/update', async({id, modelo, placa, cor, vagaEstacionamento}, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const data = await carService.updateCar(id, {modelo, placa, cor, vagaEstacionamento}, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data

});

//DELETE CARRO
export const deleteCar = createAsyncThunk('car/delete', async(id, thunkAPI) => {

    try {
        
        const token = thunkAPI.getState().auth.user.token;
        const data = await carService.deleteCar(id, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return id;        

    } catch (error) {
        console.log(error)
    }

})

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(createCar.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCar.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Carro cadastrado com sucesso.'
        })
        .addCase(createCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateCar.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCar.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null; 
            state.message = 'Carro atualizado com sucesso';
            const index = state.cars.findIndex(car => car._id === action.payload._id);
            if (index !== -1) {
                state.cars[index] = action.payload;
            }
        })
        .addCase(updateCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getMyCars.fulfilled, (state, action) => {
            state.loading = false;
            state.cars = action.payload; // Atualiza a lista de eventos
            state.error = null;
        })
        .addCase(getMyCars.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.cars = []; // Limpa a lista de eventos em caso de erro
        })
        .addCase(deleteCar.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteCar.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Carro excluído com sucesso!';
            state.cars = state.cars.filter(car => car._id !== action.payload);
        })
        .addCase(deleteCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        
    }
})

export const { resetMessage } = carSlice.actions;
export default carSlice.reducer;