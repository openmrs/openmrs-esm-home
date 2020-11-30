import React from "react";
import { RefAppLink } from "./refapp-link";

export default function ConfigureMetadata() {
  return (
    <RefAppLink
      label="Configure Metadata"
      to="${openmrsBase}/adminui/metadata/configureMetadata.page"
      privilege="App: coreapps.configuremetadata"
    />
  );
}
