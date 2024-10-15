import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import reserveReducer from './slices/reserveSlice';
import visitorsReducer from './slices/visitorsSlice';
import incidentReducer from './slices/incidentSlice';
import notificationReducer from './slices/notificationSlice';
import assembleiaReducer from './slices/assembleiaSlice';
import maintenanceReducer from './slices/maintenanceSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        reserve: reserveReducer,
        visitors: visitorsReducer,
        incident: incidentReducer,
        notification: notificationReducer, 
        assembleia: assembleiaReducer,
        maintenance: maintenanceReducer
    },    
})   