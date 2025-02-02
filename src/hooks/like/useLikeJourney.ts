import {useMutation, useQueryClient} from 'react-query';
import {debugError} from '../../utils/debug';
import {getToken} from '../../utils/authUtils';

interface LikeJourneyParams {
  idDomain: number;
  idForYou: number;
}

export default function useLikeJourney(onLikeSuccess: () => void = () => {}) {
  const queryClient = useQueryClient();

  const likeJourney = async ({idDomain, idForYou}: LikeJourneyParams) => {
    const token = await getToken();

    try {
      const response = await fetch(
        `https://api.glyss.fr/ski/v1/domains/${idDomain}/journeys/like/for-yous/${idForYou}`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return response.json();
    } catch (e) {
      throw e;
    }
  };

  const {mutate, isLoading, isSuccess, isError} = useMutation({
    mutationFn: likeJourney,
    onSuccess: () => {
      // Invalidate relevant queries after successful like
      queryClient.invalidateQueries(['likedJourneys']);
      onLikeSuccess();
    },
    onError: e => {
      debugError({
        likeJourneyError: e,
      });
    },
    mutationKey: ['likeJourney'],
  });

  return {
    likeJourney: mutate,
    isLiking: isLoading,
    likeError: isError,
    likeSuccess: isSuccess,
  };
}
