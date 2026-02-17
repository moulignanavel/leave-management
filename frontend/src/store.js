import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import leaveReducer from './features/leave/leaveSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer
  }
});

export default store;
