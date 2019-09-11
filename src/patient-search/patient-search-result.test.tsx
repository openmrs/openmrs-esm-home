import React from "react";
import { fireEvent, wait, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import renderWithRouter from "../helpers/render-with-router";
import PatientSearch from "./patient-search.component";
import { performPatientSearch } from "./patient-search.resource";

const mockSearch = performPatientSearch as jest.Mock;
const match = { params: {}, isExact: true, path: "", url: "" };
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
  performPatientSearch: jest.fn().mockResolvedValue({
    data: {
      results: []
    }
  })
}));

jest.mock("lodash", () => ({
  debounce: jest.fn(fn => fn),
  isEmpty: jest.fn(arr => arr.length === 0)
}));

afterEach(cleanup);

describe("<PatientSearch/>", () => {
  it("renders without failing", () => {
    renderWithRouter(<PatientSearch />);
  });

  it("triggers search on typing", async () => {
    mockSearch.mockResolvedValue(patients);
    const wrapper = renderWithRouter(<PatientSearch match={match} />);
    const searchInput = wrapper.container.querySelector("input");
    await wait(() => expect(wrapper.queryByText("John Doe")).toBeNull());
    act(() => {
      fireEvent.change(searchInput, { target: { value: "John" } });
    });
    await wait(() => expect(wrapper.getByText("John Doe")).not.toBeNull());
  });

  it("renders patient results upon successful search", async () => {
    mockSearch.mockResolvedValue(patients);
    const { container, queryByText } = renderWithRouter(
      <PatientSearch match={match} />
    );
    expect(queryByText("John Doe")).toBeNull();
    act(() => {
      const searchInput = container.querySelector("input");
      fireEvent.change(searchInput, { target: { value: "John" } });
    });
    await wait(() => expect(queryByText("John Doe")).not.toBeNull());
  });

  it("renders no patients found message when no patients are found", async () => {
    mockSearch.mockResolvedValue({ data: { results: [] } });
    const { container, getByText } = renderWithRouter(
      <PatientSearch match={match} />
    );
    const searchInput = container.querySelector("input");
    act(() => {
      fireEvent.change(searchInput, { target: { value: "John" } });
    });
    await wait(() => expect(getByText(/no patient/i)).not.toBeNull);
  });

  it("displays pagination buttons when there are results > 10", async () => {
    const fill = (prop, index) => {
      patients.data.results[0]["display"] = Date.now() + index;
      return prop;
    };
    let manyResults = Array(20).map(fill);
    const mockResp = { data: { results: manyResults } };
    mockSearch.mockResolvedValue(mockResp);
    const { container, getByText, queryByText } = renderWithRouter(
      <PatientSearch match={match} />
    );
    expect(queryByText(/next/i)).toBeNull;
    expect(queryByText(/previous/i)).toBeNull;
    const searchInput = container.querySelector("input");
    act(() => {
      fireEvent.change(searchInput, { target: { value: "John" } });
    });
    await wait(() => {
      const nextBtn = getByText(/next/i);
      expect(nextBtn).not.toBeNull;
      fireEvent.click(nextBtn);
      expect(getByText(/previous/i)).not.toBeNull;
    });
  });
});
