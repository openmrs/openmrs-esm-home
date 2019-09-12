import React from "react";
import { fireEvent } from "@testing-library/react";
import HomeDashboard from "./home-dashboard.component";
import renderWithRouter from "../helpers/render-with-router";

const match = { params: { id: 1 }, isExact: true, path: "", url: "" };

it("renders without failing", () => {
  renderWithRouter(<HomeDashboard match={match} />);
});

it("directs to patient search on click", () => {
  const wrapper = renderWithRouter(<HomeDashboard match={match} />);
  const patientSearchLink = wrapper.getByText(/Search for patient/i);
  expect(wrapper.history.location.pathname).toEqual("/");
  fireEvent.click(patientSearchLink);
  expect(wrapper.history.location.pathname).toEqual("/patient-search");
});
