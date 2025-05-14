import colors from '@/public/style/colors';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variantStyles = {
  primary: css`
    background-color: ${colors.primaryBlue};
    color: white;
    &:hover {
      background-color: #425880;
    }
  `,
  secondary: css`
    background-color: #425880;
    color: #334566;
    &:hover {
      opacity: 0.8;
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  `,
  md: css`
    padding: 0.7rem 1rem;
    font-size: 1rem;
  `,
  lg: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `,
};

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<Required<Pick<ButtonProps, 'variant' | 'size'>> & { fullWidth: boolean }>`
  display: inline-flex;
  align-items: end;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s, opacity 0.2s;
  cursor: pointer;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ size = 'md' }) => sizeStyles[size]}
`;

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
