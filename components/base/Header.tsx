import React, { useState } from 'react';
import { Address } from 'react-daum-postcode';

import { Button } from 'antd';
import styled from 'styled-components';
import { MdKeyboardArrowDown, MdSearch, MdMyLocation } from 'react-icons/md';

import DaumAddressModal from '../home/DaumAddressModal';

interface HeaderProps {
  onChangeAddress: (address: string) => void;
  onClickLocation: () => void;
}

const Cotainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding: 0 0.5rem;
`;

const Left = styled.div`
  img {
    height: 1.3rem;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  min-width: 1rem;

  svg {
    font-size: 1.7rem;
  }

  button + button {
    margin-left: 0.5rem;
  }
`;

const Header: React.FC<HeaderProps> = ({
  onChangeAddress,
  onClickLocation,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onComplete = (address: Address) => {
    setOpen(false);
    onChangeAddress(address.address);
  };

  return (
    <Cotainer>
      <Left>
        <img src="/logo.svg" />
      </Left>
      <Right>
        <Button
          icon={<MdMyLocation />}
          type="text"
          onClick={() => onClickLocation()}
        ></Button>
        <Button
          icon={<MdSearch />}
          type="text"
          onClick={() => onOpen()}
        ></Button>
      </Right>
      {open && <DaumAddressModal onClose={onClose} onComplete={onComplete} />}
    </Cotainer>
  );
};

export default Header;
