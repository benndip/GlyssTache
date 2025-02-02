import {useEffect} from 'react';
import {useQuery} from 'react-query';
import {debugError} from '../../utils/debug';
import {DOMAIN_BASE_URL} from '../../config';
import {getToken} from '../../utils/authUtils';
import {Customer} from '../../types';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export default function useCustomersList({domainId}: {domainId?: number}) {
  const t = async () => {
    const token = await getToken();
    try {
      const r = await fetch(
        `${DOMAIN_BASE_URL}domains/${domainId}/customers/`,
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

  const user = useSelector((state: RootState) => state.authSlice.user);
  const {data, isLoading, isRefetching, isRefetchError, error, refetch} =
    useQuery({
      queryKey: ['customersList', domainId],
      queryFn: t,
      enabled: !!domainId,
    });

  useEffect(() => {
    if (error) {
      debugError({customersListError: error});
    }
    if (isRefetchError) {
      debugError({customersListIsRefetchError: isRefetchError});
    }
  }, [error, isRefetchError]);

  return {
    refetchCustomersList: refetch,
    customersList:
      (data as Customer[])?.filter(c => c?.SkiPassID === user?.skiPass?.id) ??
      [],
    loadingCustomersList: isLoading,
    refetchingCustomersList: isRefetching,
  };
}
