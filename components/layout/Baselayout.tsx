import React from 'react';

import { Typography } from 'antd';
import styled from 'styled-components';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

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
`;

const Right = styled.div`
  width: 28rem;
  height: 100vh;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  ${({ theme }) => theme.media.md} {
    width: 100%;
  }
`;

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <Main>
      <Left>
        <InfoContainer>
          {/* <img src="/logo.svg" /> */}
          <Typography.Title level={3}>
            TV맛집 찾을 때는 티비레스토랑!
          </Typography.Title>
          <Typography.Title level={4} type="secondary">
            #골목식당 #맛있는녀석들 #수요미식회
          </Typography.Title>
        </InfoContainer>
      </Left>
      <Right>{children}</Right>
    </Main>
  );
};

export default HomeLayout;
