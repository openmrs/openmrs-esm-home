import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function SystemAdministration() {
  const { t } = useTranslation();

  return <ConfigurableLink to="${openmrsBase}/">{t('systemAdministration', 'System Administration')}</ConfigurableLink>;
}
