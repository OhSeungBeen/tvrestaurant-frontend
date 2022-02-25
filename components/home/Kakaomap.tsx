import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Restaurant } from '../../modules/restaurants';
import { Map } from '../../modules/map';
import { BsTextIndentLeft } from 'react-icons/bs';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address?: string;
  restaurants: Restaurant[];
  level: number;
  latitude: number;
  longitude: number;
  onSearch: (mapRef: any) => void;
  onChange: (map: Map) => void;
}

const MapWrapper = styled.div`
  position: relative;
  height: calc(100vh - 4rem - 4rem);
  overflow: hidden;
  button {
    position: absolute;
    width: 11rem;
    height: 2.6rem;
    transform: translate(-50%, 0);
    left: 50%;
    top: 20px;
    z-index: 1;
    text-align: center;
    font-size: ${({ theme }) => theme.font.md};
    font-weight: 500;
    border-radius: 24px;
    border: none;
    background: #f85f73;
    color: #fbe8d3;
    cursor: pointer;
  }

  button:active {
    background: #928a97;
  }
`;

const MapDiv = styled.div`
  width: 100%;
  height: 30rem;

  .wrap {
    position: absolute;
    left: 0;
    bottom: 2rem;
    width: 288px;
    height: 132px;
    margin-left: -143px;
    overflow: hidden;
  }
  .wrap .info {
    width: 286px;
    height: 120px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }
  .info .header {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: #e8e8e8;
    border-bottom: 1px solid #f4f4f2;

    div + div {
      margin-left: 0.5rem;
    }
  }
  .info .title {
    font-size: 0.875rem;
    font-weight: bold;
  }
  .info .category {
    font-size: 0.75rem;
  }
  .info .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 0.875rem;
    height: 0.875rem;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
    background-size: contain;
  }
  .info .close:hover {
    cursor: pointer;
  }
  .info .body {
    position: relative;
    padding: 0.5rem;
  }
  .info .desc {
    font-size: 0.8125rem;
  }
  .info:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
  }
`;

const KakaoMap: React.FC<KakaoMapProps> = ({
  address,
  restaurants,
  level,
  latitude,
  longitude,
  onSearch,
  onChange,
}) => {
  const [makers, setMakers] = useState<any>([]);
  const [overlays, setOverlays] = useState<any>([]);

  const mapRef = useRef<any>(null);

  const createMarker = (map: any, restaurant: Restaurant) => {
    let marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(
        restaurant.latitude,
        restaurant.longitude,
      ),
      image: new window.kakao.maps.MarkerImage(
        `/${restaurant.types[0].name}.png`,
        new window.kakao.maps.Size(30, 30),
      ),
    });

    setMakers((prevState: any) => [...prevState, marker]);

    const closeOverlay = () => {
      overlay.setMap(null);
    };

    const close = document.createElement('div');
    close.setAttribute('class', 'close');
    close.setAttribute('id', 'close');
    close.addEventListener('click', (e) => {});
    close.onclick = (e) => {
      e.preventDefault();
      closeOverlay();
    };

    const content = document.createElement('div');
    const wrap = document.createElement('div');
    wrap.setAttribute('class', 'wrap');
    const info = document.createElement('div');
    info.setAttribute('class', 'info');
    const header = document.createElement('div');
    header.setAttribute('class', 'header');
    const title = document.createElement('div');
    title.innerText = restaurant.name;
    title.setAttribute('class', 'title');
    const category = document.createElement('div');
    restaurant.categories.forEach((c) => {
      category.innerText += `${restaurant.categories[0].name} `;
    });

    category.setAttribute('class', 'category');
    const body = document.createElement('div');
    body.setAttribute('class', 'body');
    const tel = document.createElement('div');
    tel.innerText = restaurant.tel;
    tel.setAttribute('class', 'desc');
    const address = document.createElement('div');
    address.innerText = restaurant.address;
    address.setAttribute('class', 'desc');

    body.append(address, tel);
    header.append(title, category);
    info.append(header, close, body);
    wrap.append(info);
    content.appendChild(wrap);

    let overlay = new window.kakao.maps.CustomOverlay({
      content,
      position: new window.kakao.maps.LatLng(
        restaurant.latitude,
        restaurant.longitude,
      ),
    });

    setOverlays((prevState: any) => [...prevState, overlay]);

    window.kakao.maps.event.addListener(marker, 'click', () => {
      console.log(overlays);
      overlays.forEach((o: any) => {
        o.setMap(null);
      });
      overlay.setMap(map);
    });
  };

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        let center = new window.kakao.maps.LatLng(latitude, longitude);
        const map = new window.kakao.maps.Map(container, { center, level });
        mapRef.current = map;

        restaurants.forEach((restaurant) => {
          createMarker(map, restaurant);
        });

        window.kakao.maps.event.addListener(map, 'dragend', function () {
          onChange({
            level: map.getLevel(),
            latitude: map.getCenter().getLat(),
            longitude: map.getCenter().getLng(),
          });
        });
        window.kakao.maps.event.addListener(map, 'zoom_changed', function () {
          onChange({
            level: map.getLevel(),
            latitude: map.getCenter().getLat(),
            longitude: map.getCenter().getLng(),
          });
        });
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!address) return;

    if (address) {
      let geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          onChange({
            level: 3,
            latitude: result[0].y,
            longitude: result[0].x,
          });
        }
      });
    }
  }, [address]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!restaurants) return;

    makers.forEach((marker: any) => {
      marker.setMap(null);
    });
    setMakers([]);

    restaurants.forEach((restaurant) => {
      createMarker(mapRef.current, restaurant);
    });
  }, [restaurants]);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setLevel(level);
    mapRef.current.panTo(new window.kakao.maps.LatLng(latitude, longitude));
  }, [level, latitude, longitude]);

  return (
    <MapWrapper>
      <MapDiv id="map" />
      <button onClick={() => onSearch(mapRef)}>현재 위치에서 검색</button>
    </MapWrapper>
  );
};

export default KakaoMap;
