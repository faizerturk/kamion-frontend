'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginTemplate from '@/src/components/templates/LoginTemplate';
import { useAppSelector } from '@/src/store/hooks';

const LoginPage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return <LoginTemplate />;
};

export default LoginPage;
