import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './slices/videoSlice';
import userReducer from './slices/userSlice'; 
import roomReducer from './slices/roomSlice'; 

const store = configureStore({
  reducer: {
    videos: videoReducer,
    users: userReducer,
    rooms: roomReducer,
  },
});

// Define the types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
