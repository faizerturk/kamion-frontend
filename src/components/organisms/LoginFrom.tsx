import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync } from '../../store/slices/authSlice';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import colors from '@/public/style/colors';
import Image from 'next/image';
import iconMail from '@/public/assets/iconMail.png';
import iconPassword from '@/public/assets/iconPassword.png';
import slimIcon from '@/public/assets/slimIcon.png';

export default function LoginForm() {
  const [email, setEmail] = useState('frontend@kamion.co');
  const [password, setPassword] = useState('Frontend.2024');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginAsync({ email, password }));
    if (loginAsync.fulfilled.match(resultAction)) {
      router.push('/dashboard');
    }
  };

  return (
    <Container>
      <Main>
        <Header>
          <BlueDot>
            <Image src={slimIcon.src} alt='icon' width={50} height={50} />
          </BlueDot>

          <Title>Kamion®</Title>
          <Subtitle>Dashboard Log In</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorBox>{error}</ErrorBox>}

          <Field>
            <StyledInput
              label='Email Address'
              placeholder='Email Address'
              value={email}
              icon={
                <Image src={iconMail.src} alt='mail' width={20} height={20} />
              }
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field>
            <StyledInput
              id='password'
              label='Password'
              type='password'
              value={password}
              icon={
                <Image
                  src={iconPassword.src}
                  alt='password'
                  width={20}
                  height={20}
                />
              }
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>

          <SubmitButton type='submit' disabled={loading}>
            {loading ? (
              'Loading...'
            ) : (
              <>
                <span>Login</span>
                <Arrow>→</Arrow>
              </>
            )}
          </SubmitButton>
        </Form>
      </Main>

      <Footer>
        <FooterText>© Copyright 2024, </FooterText>
        <FooterText bold={true}>Kamion Logistics </FooterText>
        <FooterText>- All rights reserved.</FooterText>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  color: ${colors.darkerBlue};
`;
const BlueDot = styled.div`
  height: 58px;
  width: 56px;
  background-color: ${colors.primaryBlue};
  border-radius: 50%;
  align-items: center;
  padding-right: 10px;
  display: flex;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 44px;
  font-weight: 500;
`;
const Subtitle = styled.p`
  font-size: 44px;
  font-weight: 400;
  margin-top: 0.25rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ErrorBox = styled.div`
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
`;

const Field = styled.div``;

const StyledInput = styled(Input)`
  width: 100%;
  margin-top: 0.25rem;
  label {
    color: #6b7280;
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
  padding: 0.75rem 1.5rem;
  background-color: ${colors.primaryBlue};
  color: #fff;
  &:disabled {
    opacity: 0.6;
  }
`;

const Arrow = styled.span`
  margin-left: 0.5rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem 4rem;
`;
const FooterText = styled.p<{ bold?: boolean }>`
  display: inline;
  margin: 0;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: ${({ bold }) => (bold ? 500 : 400)};
  color: ${colors.darkerBlue};
`;
