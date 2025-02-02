import {useQuery} from 'react-query';
import {getToken} from '../../utils/authUtils';
import {useEffect} from 'react';
import {debugError} from '../../utils/debug';
import {Journey} from '../../types/ForYou';

export default function useLikedJourneys(idDomain?: number | null) {
  const getLikedJourneys = async () => {
    const token = await getToken();
    try {
      const response = await fetch(
        `https://api.glyss.fr/ski/v1/domains/${idDomain}/journeys/like`,
        {
          method: 'GET',
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

  const {isLoading, error, isSuccess, isError, data} = useQuery({
    queryFn: getLikedJourneys,
    queryKey: ['likedJourneys', idDomain],
    enabled: !!idDomain,
  });
  useEffect(() => {
    if (isError) {
      debugError({
        likedJourneysError: error,
      });
    }
  }, [isError, error]);

  return {
    loadingLikedJourneys: isLoading,
    likedJourneysError: isError,
    likedJourneys: (data as Journey[]) ?? [],
    successLikedJourneys: isSuccess,
  };
}
