import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function ConfigureMetadata() {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to="${openmrsBase}/adminui/metadata/configureMetadata.page">
      {t('configureMetadata', 'Configure Metadata')}
    </ConfigurableLink>
  );
}
