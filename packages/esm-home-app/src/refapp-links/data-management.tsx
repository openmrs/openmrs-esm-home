import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function DataManagement() {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to="${openmrsBase}/coreapps/datamanagement/dataManagement.page">
      {t('dataManagement', 'Data Management')}
    </ConfigurableLink>
  );
}
