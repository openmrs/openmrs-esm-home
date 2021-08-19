import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function DataManagement() {
  return (
    <ConfigurableLink to="${openmrsBase}/coreapps/datamanagement/dataManagement.page">Data Management</ConfigurableLink>
  );
}
