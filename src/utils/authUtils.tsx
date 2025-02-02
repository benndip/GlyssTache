import {store, RootState} from '../store';
import {CONFIG} from '../config';
import {actions} from '../store/actions';
import {jwtDecode} from 'jwt-decode';
import {debugError} from '../utils/debug';

export const getToken = async (): Promise<string | null> => {
  const state: RootState = store.getState();
  const auth = state.authSlice;
  const isTokenExpired = (token: string | null | undefined): boolean => {
    if (!token) return true;
    try {
      const expiresAt = (jwtDecode(token).exp || 0) * 1000;
      return expiresAt <= Date.now();
    } catch (error) {
      debugError({message: 'Failed to decode token', error});
      return true;
    }
  };
  if (isTokenExpired(auth.token.jwt)) {
    try {
      const response = await fetch(`${CONFIG.base_url}auth/v1/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: auth.user?.id,
          refresh_token: auth.token.refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.jwt;
        store.dispatch(
          actions.setToken({
            jwt: newToken,
            refreshToken: auth.token.refreshToken,
          }),
        );
        return newToken;
      }
    } catch (error) {
      debugError({message: 'Failed to refresh token', error});
      return null;
    }
  }
  return auth.token.jwt;
};
