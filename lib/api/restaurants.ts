import client from './client';
import { Restaurant } from '../../modules/restaurants';

export interface GetAllByLocationRequest {
  southWest: { latitude: number; longitude: number };
  northEast: { latitude: number; longitude: number };
}

// 전체 조회
export const getAll = () => client.get('/api/v1/restaurants');

// 전체 조회 (위치)
export const getAllByLocation = ({
  southWest,
  northEast,
}: GetAllByLocationRequest) =>
  client.get(
    `/api/v1/restaurants?southWestLatitude=${southWest.latitude}&southWestLongitude=${southWest.longitude}&eastNorthLatitude=${northEast.latitude}&eastNorthLongitude=${northEast.longitude}`,
  );

// 추가
export const create = (restaurant: Restaurant) =>
  client.post('api/v1/restaurants', restaurant);
