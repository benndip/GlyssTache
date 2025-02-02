import {useMutation} from 'react-query';
import {DOMAIN_BASE_URL} from '../../config';
import {getToken} from '../../utils/authUtils';
import {debug} from '../../utils/debug';
import {hoursToMinutes} from '../../utils/minuteToHours';

type useJourneysGenerateParams = {
  domainId?: number;
  lat_lon?: Array<number>;
  id_ski_pass?: number;
  duration?: number;
  level?: string;
  enabled?: boolean;
};

export default function useJourneysGenerate() {
  const {data, isLoading, isError, mutate} = useMutation({
    mutationFn: async (params: useJourneysGenerateParams) => {
      const token = await getToken();
      if (!token) {
        throw new Error('Failed to retrieve token');
      }

      const response = await fetch(
        `${DOMAIN_BASE_URL}domains/${params.domainId}/journeys/generate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            duration: hoursToMinutes(params.duration ?? 0),
            id_ski_pass: params.id_ski_pass,
            lat_lon: params.lat_lon,
            level: params.level,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
  });

  return {
    generateJourney: mutate,
    generateError: isError,
    generateLoading: isLoading,
    generatedJourney: data,
  };
}
