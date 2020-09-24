import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { ConfigurableLink } from "@openmrs/esm-module-config";

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: RefAppLink
});

export function RefAppLink(props) {
  return (
    <ConfigurableLink
      className={`omrs-link omrs-filled-neutral`}
      to={"${openmrsBase}/appointmentschedulingui/home.page"}
    >
      Appointment Scheduling
    </ConfigurableLink>
  );
}
