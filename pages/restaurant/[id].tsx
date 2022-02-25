import { NextPageContext } from 'next';
import Router from 'next/router';
import React from 'react';

import styled from 'styled-components';
import { Button, Typography, Tabs } from 'antd';
import { MdShare, MdKeyboardArrowLeft } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';

import BaseLayout from '../../components/layout/Baselayout';
import * as RestaurantAPI from '../../lib/api/restaurants';
import restaurants, { Restaurant } from '../../modules/restaurants';

interface RestaurantPageProps {
  restaurant: Restaurant;
}

const Top = styled.div`
  height: 20rem;
  background-color: #e8e8e8;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Content = styled.div`
  padding: 1rem 0;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #e8e8e8;
  font-weight: 600;
  padding: 1rem 0;
`;

const Tel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-radius: 5px;
  background-color: #e8e8e8;
  font-weight: 600;
`;

const StyledMdKeyboardArrowLeft = styled(MdKeyboardArrowLeft)`
  font-size: 2rem;
`;

const StyledMdShare = styled(MdShare)`
  font-size: 1.4rem;
`;

const TelButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 0;
  height: initial;
  span {
    margin-left: 0.3rem;
  }
`;

const Category = styled(Typography.Text)`
  margin-left: 1rem;
  color: #495464;
`;

const StyledTabs = styled(Tabs)`
  padding: 1rem;

  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab {
    justify-content: center;
    flex: 1;
    margin: 0;
    font-weight: 600;
    color: #000;
  }
  .ant-tabs-ink-bar {
    border-bottom: 2px solid #f85f73;
  }

  .ant-tabs-tab:hover {
    color: #f85f73;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #f85f73;
  }
`;

const RestaurantPage: React.FC<RestaurantPageProps> = ({ restaurant }) => {
  const onBack = () => {
    Router.back();
  };

  const onTel = () => {
    Router.push(`tel:${restaurant.tel}`);
  };

  return (
    <BaseLayout>
      <Top>
        <Header>
          <div>
            <Button
              onClick={() => onBack()}
              type="text"
              icon={<StyledMdKeyboardArrowLeft />}
            />
          </div>
          <div>
            <Button type="text" icon={<StyledMdShare />} />
          </div>
        </Header>
        <Title>
          <Typography.Title level={3}>{restaurant.name}</Typography.Title>
          {restaurant.categories.map((category, index) => (
            <Category key={index}>{category.name}</Category>
          ))}
        </Title>
      </Top>
      <StyledTabs centered size="large">
        <Tabs.TabPane tab="정보" key="1">
          <Content>
            <Typography.Title level={5}>위치</Typography.Title>
            <Location>{restaurant.address}</Location>
          </Content>
          <Content>
            <Typography.Title level={5}>전화번호</Typography.Title>
            <Tel>
              <div>{restaurant.tel}</div>
              <TelButton
                onClick={() => onTel()}
                icon={<BsTelephone />}
                type="text"
              >
                전화
              </TelButton>
            </Tel>
          </Content>
        </Tabs.TabPane>
        <Tabs.TabPane tab="리뷰" key="2"></Tabs.TabPane>
      </StyledTabs>
    </BaseLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  let restaurant;
  await RestaurantAPI.get(context.query.id as string)
    .then((response) => {
      restaurant = response.data;
    })
    .catch(() => {});

  if (!restaurant) {
    return {
      notFound: true,
    };
  }

  return { props: { restaurant } };
}

export default RestaurantPage;
