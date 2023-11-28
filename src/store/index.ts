import { configureStore } from '@reduxjs/toolkit';
import coffeesReducer from './coffeeSlice';

const store = configureStore({
  reducer: {
    coffees: coffeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
