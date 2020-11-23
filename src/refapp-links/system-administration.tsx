import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { RefAppLink } from "./refapp-link";

const Root = () => (
  <RefAppLink
    label="System Administration"
    to="${openmrsBase}/coreapps/systemadministration/systemAdministration.page"
    privilege="App: coreapps.systemAdministration"
  />
);

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});
