import type { Metadata } from 'next';
import './globals.css';
import StyledComponentsRegistry from './registry';
import Providers from '../src/store/provider';
import { axiforma } from '../public/style/fonts';

export const metadata: Metadata = {
  title: 'Kamion',
  description: 'One Platform For All Freight',
  icons: {
    icon: '/assets/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='light'>
      <link rel='icon' href='/assets/icon.png' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <body className={axiforma.variable}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
