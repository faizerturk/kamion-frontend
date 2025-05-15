import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

//TODO fix the error message ui and the label
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, ...props }, ref) => {
    const hasError = Boolean(error);
    const hasIcon = Boolean(icon);

    return (
      <Container>
        <InputWrapper>
          {label && <FloatingLabel hasError={hasError}>{label}</FloatingLabel>}
          <StyledInput
            {...props}
            ref={ref}
            hasError={hasError}
            hasIcon={hasIcon}
          />
          {icon && <IconWrapper hasError={hasError}>{icon}</IconWrapper>}
        </InputWrapper>

        {error && <ErrorText>{error}</ErrorText>}
      </Container>
    );
  }
);
Input.displayName = 'Input';
export default Input;

const Container = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
`;

interface StyledInputProps {
  hasError: boolean;
  hasIcon: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  display: block;
  width: 100%;
  background-color: white;
  color: black;
  border-radius: 0.5rem;
  border: 2px solid ${({ hasError }) => (hasError ? '#dc2626' : '#d1d5db')};

  padding: ${({ hasIcon }) =>
    hasIcon ? '1.5rem 2.5rem 0.75rem 1rem' : '1.5rem 1rem 0.75rem'};

  font-size: 1rem;
  line-height: 1.25;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? '#dc2626' : '#3b82f6')};
    box-shadow: 0 0 0 1px
      ${({ hasError }) => (hasError ? '#dc2626' : '#3b82f6')};
  }
`;

const FloatingLabel = styled.label<{ hasError: boolean }>`
  position: absolute;
  top: -0.65rem;
  left: 1rem;
  background: white;
  padding: 0 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ hasError }) => (hasError ? '#dc2626' : '#9ca3af')};
  pointer-events: none;
`;

const ErrorText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #dc2626;
  text-align: right;
`;

const IconWrapper = styled.div<{ hasError: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  pointer-events: none;
  color: ${({ hasError }) => (hasError ? '#f87171' : '#9ca3af')};
`;
