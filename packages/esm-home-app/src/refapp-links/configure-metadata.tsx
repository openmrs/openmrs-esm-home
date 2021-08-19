import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function ConfigureMetadata() {
  return (
    <ConfigurableLink to="${openmrsBase}/adminui/metadata/configureMetadata.page">Configure Metadata</ConfigurableLink>
  );
}
