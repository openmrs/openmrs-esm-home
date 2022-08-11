import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function CaptureVitals() {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to="${openmrsBase}/coreapps/findpatient/findPatient.page?app=referenceapplication.vitals">
      {t('captureVitals', 'Capture Vitals')}
    </ConfigurableLink>
  );
}
