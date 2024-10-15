import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pollService from "../services/pollServices";


const initialState = {
    error: null,
    success: false,
    loading: false,
    message: null,
    polls: [],
    pollResults: null
}

//CRIA UMA ENQUETE
export const createPoll = createAsyncThunk('poll/create', async(user, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await pollService.createPoll(user, token)
        
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;

    } catch (error) {
         console.log(error);
    }
});

// RETORNA TODAS AS ENQUENTES
export const getPolls = createAsyncThunk('poll/all', async (_, thunkAPI) => {
    
    try {

        const token = thunkAPI.getState().auth.user.token;
        const data = await pollService.getPolls(token)

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;

    } catch (error) {
        console.log(error)
    }

});

// VOTE EM UMA ENQUETE
export const votePoll = createAsyncThunk('poll/vote', async ({ id, optionID }, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await pollService.votePoll(id, optionID, token);

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});


// RESULTADO DA ENQUETE
export const getResultsPoll = createAsyncThunk('poll/results', async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await pollService.getResultsPoll(id, token);

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

export const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(createPoll.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createPoll.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Enquete criada com sucesso.'
            state.polls.push(action.payload);
        })
        .addCase(createPoll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getPolls.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getPolls.fulfilled, (state, action) => {
            state.loading = false;
            state.polls = action.payload;
            state.error = null;
        })
        .addCase(getPolls.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(votePoll.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(votePoll.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Seu voto foi registrado com sucesso';
            // Atualiza a enquete no estado após o voto
            const index = state.polls.findIndex(poll => poll._id === action.payload._id);
            if (index !== -1) {
                state.polls[index] = action.payload;
            }
        })
        .addCase(votePoll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getResultsPoll.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getResultsPoll.fulfilled, (state, action) => {
            state.loading = false;
            state.pollResults = action.payload; 
            state.error = null;
        })
        .addCase(getResultsPoll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })       
    }
})

export const { resetMessage } = pollSlice.actions;
export default pollSlice.reducer;