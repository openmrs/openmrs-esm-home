import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function AppointmentScheduling() {
  return (
    <ConfigurableLink to="${openmrsBase}/appointmentschedulingui/home.page">Appointment Scheduling</ConfigurableLink>
  );
}
