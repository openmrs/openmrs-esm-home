import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { RefAppLink } from "./refapp-link";

const Root = () => (
  <RefAppLink
    label="Capture Vitals"
    to="${openmrsBase}/coreapps/findpatient/findPatient.page?app=referenceapplication.vitals"
    privilege="App: referenceapplication.vitals"
  />
);

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});
