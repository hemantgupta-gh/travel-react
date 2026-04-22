import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlannerState {
  destinations: string[];
  itinerary: string[];
  loading: boolean;
  error: string | null;
}

const initialState: PlannerState = {
  destinations: [],
  itinerary: [],
  loading: false,
  error: null,
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    addDestination(state, action: PayloadAction<string>) {
      state.destinations.push(action.payload);
    },
    removeDestination(state, action: PayloadAction<string>) {
      state.destinations = state.destinations.filter(
        (destination) => destination !== action.payload
      );
    },
    setItinerary(state, action: PayloadAction<string[]>) {
      state.itinerary = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  addDestination,
  removeDestination,
  setItinerary,
  setLoading,
  setError,
} = plannerSlice.actions;

export default plannerSlice.reducer;
