import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { RefAppLink } from "./refapp-link";

const Root = () => (
  <RefAppLink
    label="Data Management"
    to="${openmrsBase}/coreapps/datamanagement/dataManagement.page"
    privilege="App: coreapps.dataManagement"
  />
);

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});
