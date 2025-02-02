import {useEffect} from 'react';
import {useQuery} from 'react-query';

import {debug, debugError} from '../../utils/debug';
import {getToken} from '../../utils/authUtils';
import {UserProfile} from '../../types';
import {PROFILE_URL} from './useCreateProfile';

export default function useProfile() {
  const fetchProfile = async () => {
    const token = await getToken();
    try {
      const response = await fetch(PROFILE_URL, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  };

  const {
    data,
    isLoading,
    isRefetching,
    isRefetchError,
    error,
    refetch,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    if (isError) {
      debugError({
        profileError: error,
      });
    }
    if (isRefetchError) {
      debugError({profileRefetchError: error});
    }
  }, [error, isRefetchError, isError]);

  return {
    refetchProfile: refetch,
    profileLoaded: isSuccess,
    profileError: isError,
    profile: {
      birthDate: data?.birth_date,
      firstName: data?.first_name,
      hobbyList: data?.hobby_list,
      idDomain: data?.id_domain,
      idUser: data?.id_user,
      lastName: data?.last_name,
      level: data?.level,
      pseudo: data?.pseudo,
      preferenceItinerary: data?.preference_itinerary,
    } satisfies UserProfile | undefined,
    loadingProfile: isLoading,
    refetchingProfile: isRefetching,
  };
}
