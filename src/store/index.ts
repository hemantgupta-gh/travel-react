import { configureStore } from '@reduxjs/toolkit';
import plannerReducer from './slices/plannerSlice';

const store = configureStore({
  reducer: {
    planner: plannerReducer,
  },
});

export default store;
