import React from "react";
import { RefAppLink } from "./refapp-link";

export default function AppointmentScheduling() {
  return (
    <RefAppLink
      label="Appointment Scheduling"
      to="${openmrsBase}/appointmentschedulingui/home.page"
      privilege="App: appointmentschedulingui.home"
    />
  );
}
