import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { RefAppLink } from "./refapp-link";

const Root = () => (
  <RefAppLink
    label="Active Visits"
    to="${openmrsBase}/coreapps/activeVisits.page?app=coreapps.activeVisits"
    privilege="App: coreapps.activeVisits"
  />
);

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});
