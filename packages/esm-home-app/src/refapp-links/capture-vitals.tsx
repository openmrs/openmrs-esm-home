import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function CaptureVitals() {
  return (
    <ConfigurableLink to="${openmrsBase}/coreapps/findpatient/findPatient.page?app=referenceapplication.vitals">
      Capture Vitals
    </ConfigurableLink>
  );
}
