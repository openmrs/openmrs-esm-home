import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { RefAppLink } from "./refapp-link";

const Root = () => (
  <RefAppLink
    label="Appointment Scheduling"
    to="${openmrsBase}/appointmentschedulingui/home.page"
    privilege="App: appointmentschedulingui.home"
  />
);

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});
