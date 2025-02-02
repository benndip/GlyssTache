import {useMutation, useQueryClient} from 'react-query';

import {debugError} from '../../utils/debug';
import {getToken} from '../../utils/authUtils';
import {UserProfile} from '../../types';
import {PROFILE_URL} from './useCreateProfile';

export default function useUpdateProfile(
  onUpdateSuccess: (data: UserProfile) => void = () => {},
) {
  const queryClient = useQueryClient();

  const updateProfile = async (params: UserProfile) => {
    const token = await getToken();
    try {
      const response = await fetch(PROFILE_URL, {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birth_date: params.birthDate,
          first_name: params.firstName,
          hobby_list: params.hobbyList,
          id_domain: params.idDomain,
          id_user: params.idUser,
          last_name: params.lastName,
          level: params.level,
          pseudo: params.pseudo,
          preference_itinerary: params.preferenceItinerary,
        }),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  };

  const {mutate, isLoading, error, isSuccess, isError} = useMutation(
    updateProfile,
    {
      onSuccess: data => {
        // Invalidate and refetch the profile data after successful update
        queryClient.invalidateQueries(['userProfile']);
        onUpdateSuccess(data);
      },
      onError: () => {
        debugError({
          updateProfileError: error,
        });
      },
      mutationKey: ['updateProfile'],
    },
  );

  return {
    updateProfile: mutate,
    isUpdating: isLoading,
    updateError: isError,
    profileUpdated: isSuccess,
  };
}
