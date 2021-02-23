import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import PatientSearch from "./patient-search.component";
import { performPatientSearch } from "./patient-search.resource";
import renderWithRouter from "../helpers/render-with-router";

const mockSearch = performPatientSearch as jest.Mock;
const match = { params: {}, isExact: true, path: "", url: "" };

const renderPatientSearch = () =>
  renderWithRouter(<PatientSearch match={match} />);

const patients = {
  data: {
    results: [
      {
        display: "94004EH: John Doe",
        uuid: "8673ee4f-e2ab-4077-ba55-4980f408773e",
        person: {
          age: 32,
          birthdate: "01-01-2009",
          gender: "M",
          display: "John Doe"
        },
        identifiers: [
          {
            identifier: "94004EH",
            identifierType: {
              display: "OpenMRS ID"
            }
          }
        ]
      }
    ]
  }
};

jest.mock("./patient-search.resource", () => ({
  performPatientSearch: jest.fn()
}));

describe("<PatientSearch/>", () => {
  it("renders without failing", () => {
    mockSearch.mockResolvedValue([]);
    renderPatientSearch();
  });

  it("triggers search on typing", async () => {
    mockSearch.mockResolvedValue(patients);
    renderPatientSearch();

    await screen.findByRole("textbox", { name: "Search for patient" });
    const searchInput = screen.getByRole("textbox", {
      name: "Search for patient"
    });

    expect(searchInput).toHaveFocus();
  });

  it("renders the matching patient chart results upon successful search", async () => {
    mockSearch.mockResolvedValue(patients);
    renderPatientSearch();

    await screen.findByRole("textbox", { name: "Search for patient" });
    const searchInput = screen.getByRole("textbox", {
      name: "Search for patient"
    });

    fireEvent.change(searchInput, { target: { value: "John" } });

    await screen.findByText(/Found 1 patient chart/);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("32 years")).toBeInTheDocument();
    expect(screen.getByText(/01 - Jan - 2009/)).toBeInTheDocument();
    expect(screen.getByText("94004EH")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "pagination" })
    ).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("renders an empty results UI when no matching patients are found", async () => {
    mockSearch.mockResolvedValue({ data: { results: [] } });
    renderPatientSearch();

    await screen.findByRole("textbox", { name: "Search for patient" });
    const searchInput = screen.getByRole("textbox", {
      name: "Search for patient"
    });

    fireEvent.change(searchInput, { target: { value: "John" } });
    await screen.findByText(/Sorry, no patient charts have been found/);

    expect(
      screen.getByText(/Try searching with the patient's unique ID number/)
    ).toBeInTheDocument();
    expect(screen.getByText(/OR the patient's name\(s\)/)).toBeInTheDocument();

    const searchAgainLink = screen.getByText("Search Again");
    expect(searchAgainLink).toBeInTheDocument();

    fireEvent.click(searchAgainLink);

    await screen.findByRole("textbox", { name: "Search for patient" });
    expect(searchInput).toHaveFocus();
  });
});
