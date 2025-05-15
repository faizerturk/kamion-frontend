import colors from '@/public/style/colors';
import React from 'react';
import styled from 'styled-components';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Sidebar>
        <LogoContainer></LogoContainer>
        <SidebarContent>
          <p>ONE PLATFORM FOR ALL ROAD FREIGHT</p>
          <h1>Visibility, Efficiency, Sustainability</h1>
          <h2>
            <span>MENA`s</span> Most Efficient Digital Freight Network
          </h2>
          <JoinButton
            onClick={() =>
              window.open('https://www.kamion.co/iletisim', '_blank')
            }
          >
            Join the Kamion Logistics Network <span> Sign Up</span>
            <Arrow>→</Arrow>
          </JoinButton>
        </SidebarContent>
      </Sidebar>
      <Main>{children}</Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  padding: 2rem;
  background-color: ${colors.white};
`;

const Sidebar = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 50%;
    padding: 2rem;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1.5rem;
    background-image: linear-gradient(
        to top,
        rgba(24, 95, 188, 1) 20%,
        rgba(24, 95, 188, 0) 100%
      ),
      url('/assets/loginBg.jpg');

    background-size: cover;
    background-position: center;
  }
`;

const LogoContainer = styled.div`
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
`;

const SidebarContent = styled.div`
  text-align: center;
  color: ${colors.white};

  h2 {
    font-size: 24px;
    font-weight: 400;
    line-height: 54px;
    margin-bottom: 1rem;
    color: ${colors.lightWhite};
    span {
      color: rgba(123, 185, 250, 1);
    }
  }

  h1 {
    font-size: 64px;
    line-height: 139%;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 2rem;
    font-size: 16px;
    line-height: 38px;
    letter-spacing: 24%;
  }
`;

const JoinButton = styled.button`
  background: ${colors.disabledBlue};
  color: ${colors.lightWhite};
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;

  span {
    text-decoration: underline;
    color: ${colors.white} !important;
    font-weight: 500;
    padding-left: 6px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const Arrow = styled.span`
  margin-left: 0.5rem;
  text-decoration: none !important;
  color: ${colors.white};
`;

const FooterText = styled.div`
  text-align: center;
  color: ${colors.white};
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;

  @media (min-width: 768px) {
    width: 50%;
    padding: 0 3rem;
  }
`;
