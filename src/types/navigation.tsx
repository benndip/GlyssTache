import {NavigatorScreenParams} from '@react-navigation/native';
import {Level} from '.';
import {Journey} from './ForYou';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
export type RootStackParamList = {
  Onboarding: undefined;
  SignInPassword: {email?: string; mode?: string};
  SignInEmail: {email?: string; mode?: string};
  SetPassword: {email?: string; token?: string; mode?: string};
  SignUpEmail: {email?: string; mode?: string};
  VerifyOtpEmail: {email?: string; mode?: string};
  SignUpDetails: {email?: string; mode?: string};
  LocationModal: {
    isModal: boolean;
  };
  TabNavigator: {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    Trajets: NavigatorScreenParams<JourneyStackParamList>;
    Partner: NavigatorScreenParams<ForYouStackParamList>;
    Social: undefined;
    Profile: NavigatorScreenParams<ProfileStackParamList>;
  };
  LogOut: undefined;
};

export type ForYouStackParamList = {
  Partners: undefined;
  PartnerDetails: {customerId: number};
};

export type HomeStackParamList = {
  Location: {
    isModal: boolean;
  };

  Home: undefined;
  NewFeature: undefined;
};

export type JourneyStackParams = {
  kind: 'generated' | 'like' | 'history' | 'foryou';
  mode: string;
  duration: number;
  id_ski_pass: number;
  level: Level;
  id: number | string;
  journey?: Journey;
};

export type ProfileStackParamList = {
  Profile: undefined;
  AccountInfo: undefined;
  PrivacyPolicy: undefined;
  UsagePolicy: undefined;
  LegalPolicy: undefined;
  About: undefined;
  AccountDelete: undefined;
  PolicyWebView: {url: string; title: string};
  UserProfile: undefined;
  Friends: undefined;
  FriendRequests: undefined;
  AddFriend: undefined;
};

export type JourneyStackParamList = {
  Journeys: undefined;
  JourneyMap: Partial<JourneyStackParams>;
  JourneyDetails: Partial<JourneyStackParams>;
  JourneyMsgVigilance: Partial<JourneyStackParams>;
  CreateJourney: Partial<JourneyStackParams>;
  JourneysActions: Partial<JourneyStackParams>;
  JourneyProblem: Partial<JourneyStackParams>;
};
