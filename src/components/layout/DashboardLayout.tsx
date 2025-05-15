import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@/src/store/hooks';
import { logoutAsync } from '@/src/store/slices/authSlice';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import colors from '@/public/style/colors';

interface DashboardLayoutProps {
  children: ReactNode;
}
//TODO Erase the logout
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutAsync());
    router.push('/login');
  };

  return (
    <Wrapper>
      <Header>
        <HeaderContainer>
          <Brand>
            <Logo src='/assets/icon.png' alt='Kamion Logo' />
            <TitleGroup>
              <Title>Kamion®</Title>
              <Subtitle>Yükveren Paneli</Subtitle>
            </TitleGroup>
          </Brand>

          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </HeaderContainer>
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: rgba(246, 246, 246, 1);
`;

const Header = styled.header`
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const HeaderContainer = styled.div`
  max-width: 112rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const TitleGroup = styled.div`
  margin-left: 0.5rem;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.primaryBlue};
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const LogoutButton = styled.button`
  color: #4b5563;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`;

const Main = styled.main`
  max-width: 112rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 1.5rem 2rem;
  }
`;
