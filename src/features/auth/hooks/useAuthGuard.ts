import { useAuth } from '@shared/lib/AuthContext';
import { useCallback } from 'react';

export const useAuthGuard = () => {
  const { isAuthenticated } = useAuth();

  const requireAuth = useCallback((action: () => void) => {
    if (!isAuthenticated) {
      console.log('Требуется авторизация');
      return false;
    }
    action();
    return true;
  }, [isAuthenticated]);

  return { requireAuth, isAuthenticated };
}