import { openmrsFetch, useConfig, useSession, Visit } from '@openmrs/esm-framework';
import useSWR from 'swr';
import dayjs from 'dayjs';

export function useActiveVisits() {
  const session = useSession();
  const sessionLocation = session?.sessionLocation?.uuid;

  const customRepresentation = 'custom:(uuid,startDatetime,stopDatetime)';

  const getUrl = () => {
    let url = `/ws/rest/v1/visit?v=${customRepresentation}&`;
    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('includeInactive', 'false');
    urlSearchParams.append('totalCount', 'true');
    urlSearchParams.append('location', `${sessionLocation}`);

    return url + urlSearchParams.toString();
  };

  const { data, error, isLoading } = useSWR<{ data: { results: any[]; totalCount: number } }>(getUrl, openmrsFetch);

  const responseData = data?.data.results;

  return {
    data: responseData,
    error,
    isLoading,
  };
}

export default useActiveVisits;
