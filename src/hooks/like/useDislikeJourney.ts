import {useMutation, useQueryClient} from 'react-query';
import {debugError} from '../../utils/debug';
import {getToken} from '../../utils/authUtils';

interface DislikeJourneyParams {
  idDomain: number;
  idLike: string;
}

export default function useDislikeJourney(
  onDislikeSuccess: () => void = () => {},
) {
  const queryClient = useQueryClient();

  const dislikeJourney = async ({idDomain, idLike}: DislikeJourneyParams) => {
    const token = await getToken();
    try {
      const response = await fetch(
        `https://api.glyss.fr/ski/v1/domains/${idDomain}/journeys/like/${idLike}`,
        {
          method: 'DELETE',
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

  const {mutate, isLoading, error, isSuccess, isError} = useMutation({
    mutationFn: dislikeJourney,
    onSuccess: () => {
      // Invalidate relevant queries after successful dislike
      queryClient.invalidateQueries(['likedJourneys']);
      onDislikeSuccess();
    },
    onError: () => {
      debugError({
        dislikeJourneyError: error,
      });
    },
    mutationKey: ['dislikeJourney'],
  });

  return {
    dislikeJourney: mutate,
    isDisliking: isLoading,
    dislikeError: isError,
    dislikeSuccess: isSuccess,
  };
}
