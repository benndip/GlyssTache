import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType, TokenType} from '../../types/UserType';
import {SkiPass} from '../../types';
type UserState = {
  token: TokenType | {jwt: null; refreshToken: null};
  user: UserType | null;
  rememberMe: boolean;
};
const initialState: UserState = {
  token: {jwt: null, refreshToken: null},
  user: null,
  rememberMe: false,
};
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenType>) => {
      state.token.jwt = action.payload.jwt;
      state.token.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.token = {jwt: null, refreshToken: null};
      state.user = null;
      state.rememberMe = false;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    setLocation: (
      state,
      action: PayloadAction<{location: string; skiPass: SkiPass}>,
    ) => {
      state.user = {...state.user, ...action.payload};
    },
  },
});
export const {setUser, logOut, setRememberMe, setToken, setLocation} =
  authSlice.actions;
export {authSlice};
