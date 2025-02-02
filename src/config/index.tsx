import axios from 'axios';
import {actions} from '../store/actions';
import {store} from '../store';
import {debugError} from '../utils/debug';
import {jwtDecode} from 'jwt-decode';

const BASE_URL = 'https://api.glyss.fr/';
export const DOMAIN_BASE_URL = 'https://api.glyss.fr/ski/v1/';
export const AUTHORIZATION_TOKEN = 'aH3KCew1YsWhWqW0gjb754tqNU3ndzHb3RdblI';
export const CONFIG = {
  base_url: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + AUTHORIZATION_TOKEN,
  },
};
export const MAPBOX_TOKEN =
  'pk.eyJ1IjoidmluY2VudGRhciIsImEiOiJjbTMzcmY5NHgxaHAyMmpzNzZkcGRqZ3R6In0.cC49HZ8VPzmzAraAZHoONg';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

const isTokenExpired = (token: string | undefined | null) => {
  if (!token || !token.length) return true;
  const expiresAt = (jwtDecode(token).exp || 0) * 1000;

  return expiresAt <= Date.now();
};

// Add interceptor
axiosClient.interceptors.request.use(
  async config => {
    // List of paths that don't need token refresh
    const publicPaths = ['/login', '/forget/password', '/register', '/user'];
    const isPublicPath = publicPaths.some(path => config.url?.includes(path));

    if (!isPublicPath && !config._retry) {
      const authState = store.getState().authSlice;

      try {
        let token = authState.token.jwt;

        if (isTokenExpired(token)) {
          const response = await axios.post(`${BASE_URL}auth/v1/refresh`, {
            id: authState.user?.id,
            refresh_token: authState.token.refreshToken,
          });

          const newToken = response.data;
          token = newToken?.jwt;

          store.dispatch(
            actions.setToken({
              jwt: newToken?.jwt,
              refreshToken:
                newToken?.refresh_token ?? authState.token.refreshToken,
            }),
          );
        }

        axiosClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
        config.headers['Authorization'] = `Bearer ${token}`;
      } catch (refreshError) {
        debugError({refreshError});
        // Handle refresh token failure (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
