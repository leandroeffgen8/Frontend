import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import userReducer from './slices/userSlices';
import reserveReducer from './slices/reserveSlices';
import notificationReducer from './slices/notificationSlices';
import incidentReducer from './slices/incidentsSlices';
import assemblyReducer from './slices/assemblySlices';
import carReducer from './slices/carSlices';
import pollReducer from './slices/pollSlices';



export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        reserve: reserveReducer,
        notification: notificationReducer,
        incident: incidentReducer,
        assembly: assemblyReducer,
        car: carReducer,
        poll: pollReducer,
    }
})