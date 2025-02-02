import {useEffect} from 'react';
import {useQuery} from 'react-query';

import {debugError} from '../../utils/debug';

import {getToken} from '../../utils/authUtils';
import {Domain} from '../../types';

export default function useDomainList() {
  const t = async () => {
    const token = await getToken();
    try {
      const r = await fetch('https://api.glyss.fr/ski/v1/domains/', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return r.json();
    } catch (e) {
      throw e;
    }
  };

  const {data, isLoading, isRefetching, isRefetchError, error, refetch} =
    useQuery({
      queryKey: ['domainList'],
      queryFn: t,
    });

  useEffect(() => {
    if (error) {
      debugError({
        domainListError: error,
      });
    }
    if (isRefetchError) {
      debugError({domainListIsRefetchError: error});
    }
  }, [error, isRefetchError]);

  return {
    refetchDomainList: refetch,
    domainList: data as Domain[] | undefined,
    loadingDomainList: isLoading,
    refetchingDomainList: isRefetching,
  };
}
