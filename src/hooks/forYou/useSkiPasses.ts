import {useEffect} from 'react';
import {useQuery} from 'react-query';
import {debugError} from '../../utils/debug';
import {getToken} from '../../utils/authUtils';
import {SkiPass} from '../../types';

export default function useSkiPassesList({domainId}: {domainId?: number}) {
  const t = async () => {
    const token = await getToken();

    try {
      const r = await fetch(
        `https://api.glyss.fr/ski/v1/domains/${domainId}/ski-passes`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );

      return r.json();
    } catch (e) {
      throw e;
    }
  };

  const {data, isLoading, isRefetching, isRefetchError, error, refetch} =
    useQuery({
      queryKey: ['skiPassesList', domainId],
      queryFn: t,
      enabled: !!domainId,
    });

  useEffect(() => {
    if (error) {
      debugError({skiPassesListError: error});
    }
    if (isRefetchError) {
      debugError({skiPassesListIsRefetchError: isRefetchError});
    }
  }, [error, isRefetchError]);

  return {
    refetchSkiPassesList: refetch,
    skiPassesList: data as SkiPass[],
    loadingSkiPassesList: isLoading,
    refetchingSkiPassesList: isRefetching,
  };
}
