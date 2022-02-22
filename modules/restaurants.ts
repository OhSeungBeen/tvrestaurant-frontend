import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as RestaurantAPI from '../lib/api/restaurants';
import { GetAllByLocationRequest } from '../lib/api/restaurants';

export interface Menu {
  name: string;
  price: number;
}

export interface Category {
  name: string;
}

export interface Type {
  name: string;
  episode: string;
}

export interface Restaurant {
  id: number;
  name: string;
  tel: string;
  address: string;
  latitude: number;
  longitude: number;
  menus: Menu[];
  categories: Category[];
  types: Type[];
}

export interface RestaurantsState {
  pending: boolean | null;
  data: Restaurant[];
}

export const getAllRestaurants = createAsyncThunk(
  'restaurants/getAll',
  async () => {
    const response = await RestaurantAPI.getAll();
    return response.data;
  },
);

export const getAllRestaurantsByLocation = createAsyncThunk(
  'restaurants/getAllByLocation',
  async ({ southWest, northEast }: GetAllByLocationRequest) => {
    const response = await RestaurantAPI.getAllByLocation({
      southWest,
      northEast,
    });
    return response.data;
  },
);

const initialState: RestaurantsState = {
  pending: null,
  data: [],
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllRestaurants.pending.type]: (state, action) => {
      state.pending = true;
    },
    [getAllRestaurants.fulfilled.type]: (
      state,
      action: PayloadAction<Restaurant[]>,
    ) => {
      state.pending = false;
      state.data = action.payload;
    },
    [getAllRestaurants.rejected.type]: (state, action) => {
      state.pending = false;
      state.data = [];
    },
    [getAllRestaurantsByLocation.pending.type]: (state, action) => {
      state.pending = true;
    },
    [getAllRestaurantsByLocation.fulfilled.type]: (
      state,
      action: PayloadAction<Restaurant[]>,
    ) => {
      state.pending = false;
      state.data = action.payload;
    },
    [getAllRestaurantsByLocation.rejected.type]: (state, action) => {
      state.pending = false;
      state.data = [];
    },
  },
});

export default restaurantsSlice.reducer;
