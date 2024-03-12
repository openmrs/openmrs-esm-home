import React from 'react';
import { useConfig, FetchResponse, openmrsFetch, toOmrsIsoString, getGlobalStore } from '@openmrs/esm-framework';
import useSWR from 'swr';
import dayjs from 'dayjs';

interface TestDataProps {}

export const useTestdata = () => {
  const omrsDateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';
  const appointmentDate = dayjs(new Date().setHours(0, 0, 0, 0)).format(omrsDateFormat);

  const url = `ws/rest/v1/appointment/all?forDate=${appointmentDate}`;

  const { data, error, isLoading } = useSWR<{ data: Array<TestDataProps> }>(url, openmrsFetch);

  const responseData = data?.data;
  return { responseData, error, isLoading };
};
