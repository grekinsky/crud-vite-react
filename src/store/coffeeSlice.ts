import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Coffee } from '../App.type';

const API_SERVER = import.meta.env.VITE_API_SERVER || 'http://localhost:3000/api';

type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type CoffeesState = {
  coffees: Coffee[];
  status: FetchStatus;
  error: string | null;
  singleFetchStatus: FetchStatus;
  singleFetchError: string | null;
};

const initialState: CoffeesState = {
  coffees: [],
  status: 'idle',
  error: null,
  singleFetchStatus: 'idle',
  singleFetchError: null,
};

export const fetchCoffees = createAsyncThunk('coffees/fetchCoffees', async () => {
  const response = await axios.get(`${API_SERVER}/coffee`);
  return response.data;
});

export const fetchCoffeeById = createAsyncThunk('coffees/fetchCoffee', async (id: number) => {
  const response = await axios.get(`${API_SERVER}/coffee/${id}`);
  return response.data;
});

export const addCoffee = createAsyncThunk('coffees/addCoffee', async (data: Coffee) => {
  const response = await axios.post(`${API_SERVER}/coffee`, data);
  return response.data;
});

export const modifyCoffee = createAsyncThunk(
  'coffees/modifyCoffee',
  async ({ id, ...data }: Coffee) => {
    const response = await axios.put(`${API_SERVER}/coffee/${id}`, data);
    return response.data;
  },
);

export const deleteCoffee = createAsyncThunk('coffees/deleteCoffee', async (coffeeId: number) => {
  await axios.delete(`http://localhost:3000/api/coffee/${coffeeId}`);
  return coffeeId;
});

const coffeesSlice = createSlice({
  name: 'coffees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoffees.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchCoffees.fulfilled, (state, action) => {
        // Manejo al obtener la lista de cafés
        state.status = 'succeeded';
        state.coffees = action.payload;
        state.error = '';
      })
      .addCase(fetchCoffees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error fetching coffees';
      })
      .addCase(fetchCoffeeById.pending, (state) => {
        state.singleFetchStatus = 'loading';
        state.singleFetchError = '';
      })
      .addCase(fetchCoffeeById.rejected, (state, action) => {
        state.singleFetchStatus = 'failed';
        state.singleFetchError = action.error.message ?? 'Error fetching coffee';
      })
      .addCase(fetchCoffeeById.fulfilled, (state, action) => {
        // Manejo al obtener un café por id
        state.singleFetchStatus = 'succeeded';
        state.singleFetchError = '';
        const index = state.coffees.findIndex((coffee) => coffee.id === action.payload.id);
        if (index === -1) {
          state.coffees = [...state.coffees, action.payload];
        } else {
          state.coffees[index] = { ...state.coffees[index], ...action.payload };
        }
      })
      .addCase(addCoffee.fulfilled, (state, action) => {
        // Manejo al añadir un café
        state.coffees = [...state.coffees, action.payload];
      })
      .addCase(modifyCoffee.fulfilled, (state, action) => {
        // Manejo al modificar un café
        const index = state.coffees.findIndex((coffee) => coffee.id === action.payload.id);
        if (index === -1) {
          state.coffees = [...state.coffees, action.payload];
        } else {
          state.coffees[index] = { ...state.coffees[index], ...action.payload };
        }
      })
      .addCase(deleteCoffee.fulfilled, (state, action) => {
        // Manejo al eliminar un café
        state.coffees = state.coffees.filter((coffee) => coffee.id !== action.payload);
      });
  },
});

export default coffeesSlice.reducer;
