import React from "react";
import { RefAppLink } from "./refapp-link";

export default function SystemAdministration() {
  return (
    <RefAppLink
      label="System Administration"
      to="${openmrsBase}/coreapps/systemadministration/systemAdministration.page"
      privilege="App: coreapps.systemAdministration"
    />
  );
}
