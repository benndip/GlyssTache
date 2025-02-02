import {useEffect} from 'react';
import {useQuery} from 'react-query';

import {debugError} from '../../utils/debug';
import {DOMAIN_BASE_URL} from '../../config';
import {getToken} from '../../utils/authUtils';
import {Partner} from '../../types/ForYou';

export default function usePartnerDetails({
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
        `${DOMAIN_BASE_URL}domains/${domainId}/customers/${customerId}`,
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
  const {
    data,
    isLoading,
    isRefetching,
    isRefetchError,
    error,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['partnerDetails', domainId, customerId],
    queryFn: t,
    enabled: !!domainId && !!customerId,
  });

  useEffect(() => {
    if (error) {
      debugError({partnerDetailsError: error});
    }
    if (isRefetchError) {
      debugError({partnerDetailsIsRefetchError: isRefetchError});
    }
  }, [error, isRefetchError]);

  return {
    refetchPartnerDetails: refetch,
    partnerDetails: data as Partner | undefined,
    loadingPartnerDetails: isLoading,
    refetchingPartnerDetails: isRefetching,
    isSuccessPartnerDetails: isSuccess,
  };
}
