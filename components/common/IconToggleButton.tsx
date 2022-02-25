import React from 'react';
import styled, { css } from 'styled-components';

interface IconToggleButtonProps {
  defaultSrc: string;
  activeSrc: string;
  width: number;
  height: number;
  active: boolean;
  onToggle?: () => void;
}

const Button = styled.button<IconToggleButtonProps>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-style: none;
  background: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${(props) => `url(${props.defaultSrc})`};
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      background-image: url(${props.activeSrc});
    `}
`;

const IconToggleButton: React.FC<IconToggleButtonProps> = ({
  defaultSrc,
  activeSrc,
  width,
  height,
  active,
  onToggle,
}) => {
  return (
    <Button
      defaultSrc={defaultSrc}
      activeSrc={activeSrc}
      width={width}
      height={height}
      active={active}
      onClick={onToggle}
    />
  );
};

export default IconToggleButton;
