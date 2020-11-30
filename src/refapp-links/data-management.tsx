import React from "react";
import { RefAppLink } from "./refapp-link";

export default function DataManagement() {
  return (
    <RefAppLink
      label="Data Management"
      to="${openmrsBase}/coreapps/datamanagement/dataManagement.page"
      privilege="App: coreapps.dataManagement"
    />
  );
}
