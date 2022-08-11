import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function AppointmentScheduling() {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to="${openmrsBase}/appointmentschedulingui/home.page">
      {t('appointmentScheduling', 'Appointment Scheduling')}
    </ConfigurableLink>
  );
}
