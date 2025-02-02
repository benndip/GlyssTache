import {useEffect} from 'react';
import {useQuery} from 'react-query';

import {debugError} from '../../utils/debug';
import {DOMAIN_BASE_URL} from '../../config';
import {getToken} from '../../utils/authUtils';
import {Journey} from '../../types/ForYou';

export default function ({domainId}: {domainId?: number}) {
  const {data, isLoading, isRefetching, isRefetchError, error, refetch} =
    useQuery({
      queryKey: ['journeys', domainId],
      queryFn: async () => {
        const token = await getToken();
        if (!token) {
          throw new Error('Failed to retrieve token');
        }
        const response = await fetch(
          `${DOMAIN_BASE_URL}domains/${domainId}/for-yous/`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return response.json();
      },
      enabled: !!domainId,
    });
  useEffect(() => {
    if (error) {
      debugError({error});
    }
    if (isRefetchError) {
      debugError({isRefetchError});
    }
  }, [error, isRefetchError]);

  return {
    refetchJourneys: refetch,
    JourneysList: (data as Journey[]) ?? [],
    loadingJourneysList: isLoading,
    refetchingJourneys: isRefetching,
  };
}
