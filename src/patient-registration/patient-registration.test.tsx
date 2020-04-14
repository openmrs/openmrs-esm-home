import React from "react";
import { PatientRegistration } from "./patient-registration.component";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("<PatientRegistration />", () => {
  it("render without dying", () => {
    const wrapper = render(
      <BrowserRouter>
        <PatientRegistration />
      </BrowserRouter>
    );
  });
});
