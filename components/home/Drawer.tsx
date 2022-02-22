import React, { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import styled, { createGlobalStyle } from 'styled-components';

import 'react-spring-bottom-sheet/dist/style.css';
import IconButton from '../common/Iconbutton';
import { Restaurant } from '../../modules/restaurants';

interface DrawerProps {
  open: boolean;
  restaurants: Restaurant[];
  onDismiss: () => void;
}

const GlobalStyle = createGlobalStyle`
  body {
    [data-rsbs-overlay] {
      width: 28rem;
      bottom: 4rem;
      margin: 0 auto;
      transform: translateX(50%);
      
      ${({ theme }: any) => theme.media.md} {
        transform: translateX(0);
        width: 100%;
  }
      
    }
    [data-rsbs-header]:before {
      background: #283C63;
    }
  }
`;

const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  font-size: ${({ theme }) => theme.font.md};
  .number {
    font-weight: bold;
    color: #283c63;
  }
`;

const StoreListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  div {
    width: 5rem;
    height: 5rem;
    background: #bbbfca;
  }
`;

const ContentContainer = styled.div`
  flex: 2;
  color: #495464;
  .name {
    font-weight: 600;
    font-size: 0.875rem;
    color: #495464;
  }
  .address,
  .tel,
  .category {
    font-size: 0.8125rem;
    font-weight: 500;
  }
  .distace,
  .menu {
    font-size: 0.8125rem;
    font-weight: 500;
  }
  div + div {
    margin: 0.75rem 0;
  }
  span + span {
    border-left: 1px solid #e8e8e8;
    margin-left: 0.75rem;
    padding-left: 0.75rem;
  }
`;

const LikedContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 12px;
    color: #f85f73;
  }
`;

const Drawer: React.FC<DrawerProps> = ({ open, restaurants, onDismiss }) => {
  const onClickStoreListItem = (restaurantId: number) => {
    console.log(restaurantId);
  };

  return (
    <>
      <GlobalStyle />
      <BottomSheet
        open={open}
        // onDismiss={onDismiss}
        blocking={false}
        snapPoints={({ headerHeight, maxHeight }) => [
          headerHeight,
          maxHeight - 64 - 64,
        ]}
        header={
          <BottomSheetHeader>
            <span className="number">{restaurants.length}</span>
            <span>개의 맛집을 찾았어요.</span>
          </BottomSheetHeader>
        }
      >
        {restaurants.map((restaurant) => (
          <StoreListItem
            key={restaurant.id}
            onClick={() => onClickStoreListItem(restaurant.id)}
          >
            <ImageContainer>
              <div></div>
            </ImageContainer>
            <ContentContainer>
              <div>
                <span className="name">{restaurant.name}</span>
                {restaurant.categories.map((category) => (
                  <span className="category">{category.name}</span>
                ))}
              </div>
              <div>
                <span className="tel">{restaurant.tel}</span>
              </div>
              <div>
                <span className="address">{restaurant.address}</span>
              </div>
              <div>
                {restaurant.menus.map((menu) => (
                  <span className="menu">{menu.name}</span>
                ))}
              </div>
              {/* <div>
                <span className="distace">300m</span>
              </div> */}
            </ContentContainer>
            <LikedContainer>
              {/* <IconButton
                width={like.width}
                height={like.height}
                defaultSrc={like.src}
                activeSrc={liked.src}
                active={active}
                onToggle={onToggleLike}
              />
              <span>0</span> */}
            </LikedContainer>
          </StoreListItem>
        ))}
      </BottomSheet>
    </>
  );
};

export default Drawer;
