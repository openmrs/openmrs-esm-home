import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { RefAppLink } from "./refapp-link";

const Root = () => (
  <RefAppLink
    label="Reports"
    to="${openmrsBase}/reportingui/reportsapp/home.page"
    privilege="View Reports"
  />
);

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});
