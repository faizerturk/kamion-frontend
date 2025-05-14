import type { Metadata } from 'next';
import './globals.css';
import StyledComponentsRegistry from './registry';
import Providers from '../src/store/provider';
import { axiforma } from '../public/style/fonts';

export const metadata: Metadata = {
  title: 'Kamion',
  description: 'One Platform For All Freight',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='light'>
      <body className={axiforma.variable}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
