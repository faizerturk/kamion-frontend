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
  const { loading, error: authError } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginAsync({ email, password }));
    if (loginAsync.fulfilled.match(resultAction)) {
      router.push('/dashboard');
    }
  };

  // emailError e-postayla ilgili global hata mesajıysa göster
  const emailError = authError?.toLowerCase().includes('email')
    ? authError
    : undefined;

  // şifre hatasıysa direkt göster, yoksa e-posta hatası değilse fallback mesaj
  const passwordError = authError
    ? authError.toLowerCase().includes('password')
      ? authError
      : !emailError
      ? 'Your password is missing or entered incorrectly.'
      : undefined
    : undefined;

  return (
    <Container>
      <Main>
        <Header>
          <BlueDot>
            <Image src={slimIcon} alt='icon' width={50} height={50} />
          </BlueDot>
          <Title>Kamion®</Title>
          <Subtitle>Dashboard Log In</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Input
              label='Email Address'
              placeholder='Email Address'
              value={email}
              icon={<Image src={iconMail} alt='mail' width={20} height={20} />}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={emailError}
            />
          </Field>

          <Field>
            <Input
              id='password'
              label='Password'
              type='password'
              value={password}
              icon={
                <Image
                  src={iconPassword}
                  alt='password'
                  width={20}
                  height={20}
                />
              }
              onChange={(e) => setPassword(e.target.value)}
              required
              error={passwordError}
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
        <FooterText bold>Kamion Logistics </FooterText>
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
  display: flex;
  align-items: center;
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

const Field = styled.div``;

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
  margin: 0;
  font-size: 0.875rem;
  font-weight: ${({ bold }) => (bold ? 500 : 400)};
  color: ${colors.darkerBlue};
`;
