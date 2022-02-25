import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import restaurants, { RestaurantsState } from './restaurants';
import map, { MapState } from './map';

export type RootState = {
  restaurants: RestaurantsState;
  map: MapState;
};

const reducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    restaurants,
    map,
  })(state, action);
};

export default reducer;
