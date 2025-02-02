import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {store} from '../store';
import {getToken} from '../utils/authUtils';
import {QueryKey, useMutation, useQuery, UseQueryOptions} from 'react-query';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {CONFIG} from '../config';
import {actions} from '../store/actions';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type Navigation = NativeStackNavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<Navigation>();
type Route = RouteProp<RootStackParamList, keyof RootStackParamList>;
export const useAppRoute = () => useRoute<Route>();

export const hooks = {
  useAppDispatch,
  useAppSelector,
  useAppNavigation,
  useAppRoute,
};
