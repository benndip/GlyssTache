import {createSlice} from '@reduxjs/toolkit';
import {Domain} from '../../types';

const initialState = {
  screen: 'Accueil',
  currentDomain: null as Domain | null,
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
    setCurrentDomain: (state, action) => {
      state.currentDomain = action.payload;
    },
  },
});
export const {setScreen, setCurrentDomain} = tabSlice.actions;
