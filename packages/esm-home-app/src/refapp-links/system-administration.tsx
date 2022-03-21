import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function SystemAdministration() {
  return <ConfigurableLink to="${openmrsBase}/admin">System Administration</ConfigurableLink>;
}
