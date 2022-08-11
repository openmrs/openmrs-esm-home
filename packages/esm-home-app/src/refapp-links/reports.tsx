import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function Reports() {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to="${openmrsBase}/reportingui/reportsapp/home.page">{t('reports', 'Reports')}</ConfigurableLink>
  );
}
