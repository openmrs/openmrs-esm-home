import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function Reports() {
  return <ConfigurableLink to="${openmrsBase}/reportingui/reportsapp/home.page">Reports</ConfigurableLink>;
}
