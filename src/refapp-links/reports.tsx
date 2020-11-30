import React from "react";
import { RefAppLink } from "./refapp-link";

export default function Reports() {
  return (
    <RefAppLink
      label="Reports"
      to="${openmrsBase}/reportingui/reportsapp/home.page"
      privilege="View Reports"
    />
  );
}
