import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function ActiveVisits() {
  return (
    <ConfigurableLink to="${openmrsBase}/coreapps/activeVisits.page?app=coreapps.activeVisits">
      Active Visits
    </ConfigurableLink>
  );
}
