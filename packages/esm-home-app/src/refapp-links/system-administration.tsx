import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function SystemAdministration() {
  return (
    <ConfigurableLink to="${openmrsBase}/coreapps/systemadministration/systemAdministration.page">
      System Administration
    </ConfigurableLink>
  );
}
