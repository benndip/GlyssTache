import {useEffect} from 'react';
import {useQuery} from 'react-query';

import {debugError} from '../../utils/debug';
import {DOMAIN_BASE_URL} from '../../config';
import {getToken} from '../../utils/authUtils';
import {Journey} from '../../types/ForYou';

export default function usePartnerJourneys({
  domainId,
  customerId,
}: {
  domainId?: number;
  customerId?: number;
}) {
  const t = async () => {
    const token = await getToken();
    try {
      const r = await fetch(
        `${DOMAIN_BASE_URL}domains/${domainId}/customers/${customerId}/for-yous`,
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
      queryKey: ['journeys', domainId, customerId],
      queryFn: t,
      enabled: !!domainId && !!customerId,
    });


  useEffect(() => {
    if (error) {
      debugError({journeysError: error});
    }
    if (isRefetchError) {
      debugError({journeysIsRefetchError: isRefetchError});
    }
  }, [error, isRefetchError]);

  return {
    refetchJourneys: refetch,
    journeys: (data as Journey[]) ?? [],
    loadingJourneys: isLoading,
    refetchingJourneys: isRefetching,
  };
}
