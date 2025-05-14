'use client';
import React from 'react';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Wrapper>
      <Content>
        <Title>404</Title>
        <Message>Oops! Page not found</Message>
        <HomeLink href='/'>Return to Home</HomeLink>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 1rem;
`;

const HomeLink = styled.a`
  font-size: 1rem;
  color: #3b82f6;
  text-decoration: underline;

  &:hover {
    color: #1e40af;
  }
`;
