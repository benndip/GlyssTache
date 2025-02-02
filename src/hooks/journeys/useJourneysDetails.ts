import {useEffect} from 'react';
import {JourneyStackParams} from '../../types/navigation';
import {useQuery} from 'react-query';
import {debugError} from '../../utils/debug';
import {getToken} from '../../utils/authUtils';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Journey, JourneyDetails} from '../../types/ForYou';

type UseJourneysDetailsProps = {
  id: Journey['id'];
  kind: Omit<JourneyStackParams['kind'], 'generate'>;
};
export default function useJourneysDetails({
  id,
  kind,
}: UseJourneysDetailsProps) {
  const domainId = useSelector(
    (state: RootState) => state.tabSlice.currentDomain?.id,
  );

  const suffixes = {
    like: 'journeys/like',
    history: 'journeys/history',
    foryou: 'for-yous',
  };
  const t = async () => {
    const token = await getToken();

    try {
      const r = await fetch(
        `https://api.glyss.fr/ski/v1/domains/${domainId}/${
          suffixes[kind as keyof typeof suffixes]
        }/${id}`,
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
      queryKey: ['journeyDetails', id, kind, domainId],
      queryFn: t,
      enabled: !!domainId,
    });

  useEffect(() => {
    if (error) {
      debugError({
        journeyDetailsError: error,
      });
    }
    if (isRefetchError) {
      debugError({journeyDetailsIsRefetchError: error});
    }
  }, [error, isRefetchError]);

  return {
    refetchJourneyDetails: refetch,
    journeyDetails: (data as JourneyDetails) ?? [],
    loadingJourneyDetails: isLoading,
    refetchingJourneyDetails: isRefetching,
  };
}
