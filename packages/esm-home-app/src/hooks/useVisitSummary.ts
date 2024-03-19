import { openmrsFetch, useSession, Visit } from '@openmrs/esm-framework';
import useSWR from 'swr';
import dayjs from 'dayjs';

const useVisitSummary = () => {
  const omrsDateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';
  const currentVisitDate = dayjs(new Date().setHours(0, 0, 0, 0)).format(omrsDateFormat);

  const visitsUrl = `/ws/rest/v1/visit?includeInactive=true&v=custom:(uuid,patient:(uuid,identifiers:(identifier,uuid),person:(age,display,gender,uuid)),visitType:(uuid,name,display),location:(uuid,name,display),startDatetime,stopDatetime)&fromStartDate=${dayjs(
    currentVisitDate,
  ).format('YYYY-MM-DD')}`;
  // &location=${session?.sessionLocation?.uuid} : to add location filtering

  const { data, error, isLoading } = useSWR<{ data: { results: Visit[] } }>(visitsUrl, openmrsFetch);

  const responseData = data?.data;

  return { data: responseData, error, isLoading };
};

export default useVisitSummary;
