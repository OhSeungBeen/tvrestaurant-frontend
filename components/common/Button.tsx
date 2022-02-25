import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../../styles/palette';

interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'size'> {
  color?: 'pink' | 'beige' | 'gray' | 'navy' | 'transparent';
  size?: 'md' | 'lg';
}

const StyledButton = styled.button<{ color: string; size: string }>`
  ${(props) =>
    props.color === 'transparent'
      ? css`
          color: #000;
        `
      : css`
          color: #fff;
        `}
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => palette[props.color]};
  ${(props) =>
    props.size === 'md' &&
    css`
      height: 2rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      font-size: 1rem;
    `}
  ${(props) =>
    props.size === 'lg' &&
    css`
      height: 2.5rem;
      padding-left: 1.125rem;
      padding-right: 1.125rem;
      font-size: 1.125rem;
    `}
`;

const Button: React.FC<ButtonProps> = ({
  color = 'navy',
  size = 'md',
  children,
  ...rest
}) => {
  const restProps = rest as any;
  return (
    <StyledButton color={color} size={size} {...restProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
