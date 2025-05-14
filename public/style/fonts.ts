import localFont from 'next/font/local';

export const axiforma = localFont({
  src: [
    {
      path: './fonts/Axiforma-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Axiforma-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Axiforma-Thin.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-axiforma',
  display: 'swap',
});
