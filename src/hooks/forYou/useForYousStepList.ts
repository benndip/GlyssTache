import {useEffect} from 'react';
import {useQuery} from 'react-query';

import {debugError} from '../../utils/debug';
import {DOMAIN_BASE_URL} from '../../config';
import {getToken} from '../../utils/authUtils';

export default function ({
  domainId,
  idForYou,
  enabled,
}: {
  domainId?: number;
  idForYou?: number;
  enabled?: boolean;
}) {
  const t = async () => {
    const token = await getToken();
    try {
      const r = await fetch(
        `${DOMAIN_BASE_URL}domains/${domainId}/for-yous/${idForYou}`,
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
      queryKey: ['journeys', domainId, idForYou],
      queryFn: t,
      enabled: !!domainId && !!idForYou && enabled,
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
    StepList: data,
    loadingStepList: isLoading,
    refetchingJourneys: isRefetching,
  };
}
