import React from "react";
import { fireEvent, render } from "@testing-library/react";
import HomeDashboard from "./home-dashboard.component";

import { useConfig as mockUseConfig } from "@openmrs/esm-module-config";
import { MemoryRouter, Route } from "react-router";
import renderWithRouter from "../helpers/render-with-router";

const match = { params: { id: 1 }, isExact: true, path: "", url: "" };

function renderHome() {
  return renderWithRouter(<HomeDashboard match={match} />);
}

it("renders without failing", () => {
  renderHome();
});

it("directs to patient search on click", () => {
  const wrapper = renderHome();
  const patientSearchLink = wrapper.getByText(/Search for patient/i);
  fireEvent.click(patientSearchLink);
  expect(wrapper.history.location.pathname).toEqual("/patient-search");
});

it("renders buttons declared in config", () => {
  mockUseConfig.mockReturnValue({
    buttons: {
      enabled: true,
      list: [
        {
          label: "Foo",
          link: {
            spa: true,
            url: "/some/route"
          }
        }
      ]
    }
  });
  const { getByText } = renderHome();
  const fooButton = getByText("Foo");
  expect(fooButton).not.toBeNull();
});

it("clicking buttons takes user to the right places", () => {
  mockUseConfig.mockReturnValue({
    buttons: {
      enabled: true,
      list: [
        {
          label: "Foo",
          link: {
            spa: true,
            url: "/some/route"
          }
        }
      ]
    }
  });
  const { getByText, history } = renderHome();
  fireEvent.click(getByText("Foo"));
  expect(history.location.pathname).toBe("/some/route");
});
