import React from "react";
import { RefAppLink } from "./refapp-link";

export default function CaptureVitals() {
  return (
    <RefAppLink
      label="Capture Vitals"
      to="${openmrsBase}/coreapps/findpatient/findPatient.page?app=referenceapplication.vitals"
      privilege="App: referenceapplication.vitals"
    />
  );
}
