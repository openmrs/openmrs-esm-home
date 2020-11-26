import React from "react";
import { RefAppLink } from "./refapp-link";

export default function Root() {
  return (
    <RefAppLink
      label="Active Visits"
      to="${openmrsBase}/coreapps/activeVisits.page?app=coreapps.activeVisits"
      privilege="App: coreapps.activeVisits"
    />
  );
}
