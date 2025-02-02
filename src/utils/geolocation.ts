import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {debugError} from './debug';
import {PermissionsAndroid, Platform} from 'react-native';

type GeolocationConfig = {
  skipPermissionRequests: boolean;
  authorizationLevel?: 'always' | 'whenInUse' | 'auto';
  enableBackgroundLocationUpdates?: boolean;
  locationProvider?: 'playServices' | 'android' | 'auto';
};

export function initGeolocation(
  config: GeolocationConfig = {
    skipPermissionRequests: false,
  },
) {
  Geolocation.setRNConfiguration(config);
}

export async function requestLocationPermission() {
  let granted = true;
  if (Platform.OS === 'android') {
    try {
      const permissionsResults = [
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission de localisation',
            message: `Votre position est utilisée pour indiquer votre position sur le plan, obtenir des
			itinéraires et des estimations de temps ainsi que pour améliorer les résultats de
			recherche.`,
            buttonNeutral: 'Demander plus tard',
            buttonNegative: 'Annuler',
            buttonPositive: 'OK',
          },
        ),
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: 'Permission de localisation',
            message: `Votre position est utilisée pour indiquer votre position sur le plan, obtenir des
            itinéraires et des estimations de temps ainsi que pour améliorer les résultats de
            recherche.`,
            buttonNeutral: 'Demander plus tard',
            buttonNegative: 'Annuler',
            buttonPositive: 'OK',
          },
        ),
      ];
      const allGranted = permissionsResults.every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );
      if (!allGranted) {
        granted = false;
        debugError('Location access denied');
      }
    } catch (err) {
      debugError(err);
    }
  }
  Geolocation.requestAuthorization(
    () => {},
    error => {
      debugError(error);
      granted = false;
    },
  );

  return granted;
}

export function getCurrentPosition(
  callback: (position: GeolocationResponse) => void,
) {
  Geolocation.getCurrentPosition(callback, error => {
    debugError(error);
  });
}
