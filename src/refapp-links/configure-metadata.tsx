import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { RefAppLink } from "./refapp-link";

const Root = () => (
  <RefAppLink
    label="Configure Metadata"
    to="${openmrsBase}/adminui/metadata/configureMetadata.page"
    privilege="App: coreapps.configuremetadata"
  />
);

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});
