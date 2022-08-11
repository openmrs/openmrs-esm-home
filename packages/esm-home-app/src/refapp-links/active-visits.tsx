import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function ActiveVisits() {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to="${openmrsBase}/coreapps/activeVisits.page?app=coreapps.activeVisits">
      {t('activeVisits', 'Active Visits')}
    </ConfigurableLink>
  );
}
