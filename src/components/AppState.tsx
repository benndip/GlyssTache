import React, {useEffect, useRef} from 'react';
import {AppState as AppStateType} from 'react-native';
import {actions} from '../store/actions';
import {useAppSelector, useAppDispatch} from '../store';
const AppState: React.FC = () => {
  const dispatch = useAppDispatch();
  const rememberMe = useAppSelector(state => state.authSlice.rememberMe);
  const appState = useRef(AppStateType.currentState);
  useEffect(() => {
    const subscription = AppStateType.addEventListener(
      'change',
      nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
        }
        appState.current = nextAppState;
        if (
          appState.current === 'background' ||
          appState.current === 'inactive'
        ) {
          if (!rememberMe) {
            dispatch(actions.logOut());
          }
        }
      },
    );
    return () => {
      subscription.remove();
    };
  }, [rememberMe]);
  return null;
};
export default AppState;
