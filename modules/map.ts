import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Map {
  level: number;
  latitude: number;
  longitude: number;
}

export interface MapState {
  data: Map;
}

const initialState: MapState = {
  data: {
    level: 3,
    latitude: 37.558185720490265,
    longitude: 126.94538209325268,
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<Map>) => {
      state.data = action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;
export default mapSlice.reducer;
