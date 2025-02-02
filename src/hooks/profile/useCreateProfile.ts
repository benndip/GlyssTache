import {useMutation, useQueryClient} from 'react-query';

import {debugError} from '../../utils/debug';
import {getToken} from '../../utils/authUtils';
import {RootState, useAppDispatch} from '../../store';
import {actions} from '../../store/actions';
import {useSelector} from 'react-redux';
import useProfile from './useProfile';

export const PROFILE_URL = 'https://api.glyss.fr/profile/v1/';

type CreateUserParams = {
  birth_date: string;
  first_name: string;
  last_name: string;
  pseudo: string;
};
export default function useCreateProfile(
  onCreateSuccess: (data: any) => void = () => {},
  onCreateError: (error: any) => void = () => {},
) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.authSlice.user);
  const {profile} = useProfile();
  const createProfile = async (params: CreateUserParams) => {
    console.log("Params", params);
    console.log("Profile", profile);
    
    const token = await getToken();
    return
    try {
      const response = await fetch(PROFILE_URL, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(params),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  };

  const {mutate, isLoading, error} = useMutation(createProfile, {
    onSuccess: data => {
      // Invalidate and refetch the profile data after successful update
      queryClient.invalidateQueries(['userProfile']);

      dispatch(
        actions.setUser({
          ...user,
          id: profile?.idUser,
          name: profile?.pseudo ?? profile?.firstName + ' ' + profile?.lastName,
        }),
      );
      data === 'ok' && onCreateSuccess(data);
    },
    onError: (mError: any) => {
      debugError({
        createProfileError: mError,
      });
      onCreateError(mError);
    },
    mutationKey: ['createProfile'],
  });

  return {
    createProfile: mutate,
    isCreating: isLoading,
    createError: error,
  };
}
