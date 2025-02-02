import {useEffect} from 'react';
import {useQuery} from 'react-query';

import {debugError} from '../../utils/debug';
import {getToken} from '../../utils/authUtils';
import {Journey} from '../../types/ForYou';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export default function useJourneysHistory() {
  const t = async () => {
    const token = await getToken();
    try {
      const r = await fetch(
        `https://api.glyss.fr/ski/v1/domains/${currentDomain?.id}/journeys/history`,
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
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );
  const {data, isLoading, isRefetching, isRefetchError, error, refetch} =
    useQuery({
      queryKey: ['journeysHistory', currentDomain?.id],
      queryFn: t,
      enabled: !!currentDomain,
    });

  useEffect(() => {
    if (error) {
      debugError({journeysHistoryError: error});
    }
    if (isRefetchError) {
      debugError({journeysHistoryIsRefetchError: isRefetchError});
    }
  }, [error, isRefetchError]);

  return {
    refetchJourneysHistory: refetch,
    journeysHistory: (data as Journey[]) ?? [],
    loadingJourneysHistory: isLoading,
    refetchingJourneysHistory: isRefetching,
  };
}
