import {ViewToken} from 'react-native/types';
import type {UserType} from './UserType';
export type ViewableItemsChanged = {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
};
export type OnboardingTypes = {
  id: number;
  image: any;
  description: string;
  title: string;
};

export type Domain = {
  id: number;
  name: string;
  coordinates: {
    lat: number;
    lon: number;
  };
};

export type SkiPass = {
  id: number;
  name: string;
  price: number;
};

export type Customer = {
  ID: number;
  Name: string;
  Tag: string;
  ShortDescription: string;
  CoverURL: string;
  Lat: number;
  Lon: number;
  SkiPassID: number;
};
export type {UserType};

export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERIENCED' | 'PRO';
export type levelLabel =
  | 'DÉBUTANT'
  | 'INTERMÉDIAIRE'
  | 'EXPÉRIMENTÉ'
  | 'PROFESSIONNEL';
export type LevelListItem = {
  id: number;
  color: string;
  value: Level;
  label: levelLabel;
};

type Hobby =
  | 'PreferenceHobbyDrink'
  | 'PreferenceHobbyRestaurant'
  | 'PreferenceHobbyShopping'
  | 'PreferenceHobbyFun';

export type UserProfile = {
  birthDate: string;
  firstName: string;
  hobbyList: Hobby[];
  idDomain: number;
  idUser: number;
  lastName: string;
  level: string;
  pseudo: string;
  preferenceItinerary: string;
};
