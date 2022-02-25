import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import Head from 'next/head';

import { Checkbox, Row, Col } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styled from 'styled-components';

import { getAllRestaurantsByLocation } from '../modules/restaurants';
import { RootState } from '../modules';
import { Map, setMap } from '../modules/map';
import Header from '../components/base/Header';
import Drawer from '../components/home/Drawer';
import KakaoMap from '../components/home/Kakaomap';
import BaseLayout from '../components/layout/Baselayout';
import Footer from '../components/base/Footer';

const ScrollWrapper = styled.div`
  height: calc(100vh - 4rem);
  overflow: auto;
`;

const StyledCheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
  padding: 0.5rem 1rem;
`;

const HomePage: NextPage = () => {
  const dispatch = useDispatch();

  const restaurants = useSelector((state: RootState) => state.restaurants.data);
  const mapInfo = useSelector((state: RootState) => state.map.data);

  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([
    '골목식당',
    '맛있는 녀석들',
    '수요미식회',
  ]);

  useEffect(() => {
    if (restaurants.length > 0) {
      setOpen(true);
    }
  }, [restaurants]);

  const onSearch = useCallback(async (mapRef: any) => {
    const southWest = mapRef.current.getBounds().getSouthWest();
    const northEast = mapRef.current.getBounds().getNorthEast();

    dispatch(
      getAllRestaurantsByLocation({
        southWest: { latitude: southWest.Ma, longitude: southWest.La },
        northEast: { latitude: northEast.Ma, longitude: northEast.La },
      }),
    );
  }, []);

  const onChangeAddress = useCallback((address: string) => {
    setAddress(address);
  }, []);

  const onChangeMap = useCallback((map: Map) => {
    dispatch(setMap(map));
  }, []);

  const onDismiss = () => {
    setOpen(false);
  };

  const onClickLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setMap({
              level: 3,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          );
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  };

  const onChangeCheckList = (checkedValue: CheckboxValueType[]) => {
    setCheckedList(checkedValue);
  };

  return (
    <>
      <Head>
        <title>tvrestaurant</title>
        <meta name="" content="" />
        <link rel="icon" href="" />
      </Head>
      <BaseLayout>
        <Header
          onChangeAddress={onChangeAddress}
          onClickLocation={onClickLocation}
        />
        <StyledCheckboxGroup value={checkedList} onChange={onChangeCheckList}>
          <Row>
            <Col span={8}>
              <Checkbox value="골목식당">골목식당</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="맛있는 녀석들">맛있는 녀석들</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="수요미식회">수요미식회</Checkbox>
            </Col>
          </Row>
        </StyledCheckboxGroup>

        <ScrollWrapper>
          <KakaoMap
            address={address ? address : undefined}
            restaurants={restaurants}
            level={mapInfo.level}
            latitude={mapInfo.latitude}
            longitude={mapInfo.longitude}
            onSearch={onSearch}
            onChange={onChangeMap}
          />
          <Drawer open={open} restaurants={restaurants} onDismiss={onDismiss} />
          <Footer />
        </ScrollWrapper>
      </BaseLayout>
    </>
  );
};

export default HomePage;
