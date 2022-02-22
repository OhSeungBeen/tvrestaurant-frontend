import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/base/Header';
import Drawer from '../components/home/Drawer';
import KakaoMap from '../components/home/Kakaomap';
import HomeLayout from '../components/layout/HomeLayout';
import Footer from '../components/base/Footer';
import { getAllRestaurantsByLocation } from '../modules/restaurants';
import { RootState } from '../modules';

const Left = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 28rem;
  height: 100vh;
  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 50vh;
  img {
    margin-bottom: ${({ theme }) => theme.margin.xxxl};
    height: 1.7rem;
  }
  h2 {
    margin-bottom: ${({ theme }) => theme.margin.lg};
  }
  h3 {
    margin-bottom: ${({ theme }) => theme.margin.md};
    color: gray;
  }
`;

const HomeContainer = styled.div`
  width: 28rem;
  height: 100vh;
  ${({ theme }) => theme.media.md} {
    width: 100%;
  }
`;

const ScrollWrapper = styled.div`
  height: calc(100vh - 4rem);
  overflow: auto;
`;

const HomePage: NextPage = () => {
  const dispatch = useDispatch();

  const restaurants = useSelector((state: RootState) => state.restaurants.data);

  const [address, setAddress] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onSearch = (mapRef: any) => {
    const southWest = mapRef.current.getBounds().getSouthWest();
    const northEast = mapRef.current.getBounds().getNorthEast();
    dispatch(
      getAllRestaurantsByLocation({
        southWest: { latitude: southWest.Ma, longitude: southWest.La },
        northEast: { latitude: northEast.Ma, longitude: northEast.La },
      }),
    );

    setDrawerOpen(true);
  };

  const onChange = (address: string) => {
    setAddress(address);
  };

  const onDismiss = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Head>
        <title>tvrestaurant</title>
        <meta name="" content="" />
        <link rel="icon" href="" />
      </Head>
      <HomeLayout>
        <Left>
          <InfoContainer>
            <img src="/logo.svg" />
            <h2>TV맛집 찾을 때는 티비 레스토랑!</h2>
            <h3>#맛있는녀석들 #골목식당 #장사의신</h3>
          </InfoContainer>
        </Left>
        <HomeContainer>
          <Header onChange={onChange} />
          <ScrollWrapper>
            <KakaoMap
              address={address ? address : undefined}
              onSearch={onSearch}
              restaurants={restaurants}
            />
            <Drawer
              open={drawerOpen}
              onDismiss={onDismiss}
              restaurants={restaurants}
            />
            <Footer />
          </ScrollWrapper>
        </HomeContainer>
      </HomeLayout>
    </>
  );
};

export default HomePage;
