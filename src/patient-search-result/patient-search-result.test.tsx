import React from "react";
import { render, screen } from "@testing-library/react";

import PatientSearchResult from "./patient-search-result.component";

const match = { params: {}, isExact: true, path: "", url: "" };
const patients = [
  {
    patientId: 5555555,
    uuid: "54c77c2c-a53f-41ca-a167-705ae0141b9f",
    identifiers: [
      {
        display: "OpenMRS ID = 100HUN",
        uuid: "332b8cca-68af-40ea-9004-6a69ff1d85df",
        identifier: "100HUN",
        identifierType: {
          uuid: "05a29f94-c0ed-11e2-94be-8c13b969e334",
          display: "OpenMRS ID"
        },
        location: {
          uuid: "b1a8b05e-3542-4037-bbd3-998ee9c40574",
          display: "Inpatient Ward"
        },
        preferred: true,
        voided: false
      }
    ],
    display: "100HUN - Smith John Mark",
    patientIdentifier: {
      uuid: "332b8cca-68af-40ea-9004-6a69ff1d85df",
      identifier: "100HUN"
    },
    person: {
      gender: "M",
      age: 22,
      birthdate: "1998-04-28T00:00:00.000+0000",
      birthdateEstimated: false,
      personName: {
        display: "Smith John Mark",
        uuid: "c657ad58-68db-46f8-9dd1-8da2f078fa51"
      },
      display: "Smith John Mark"
    },
    index: 1
  }
];

const renderPatientSearchResult = () =>
  render(
    <PatientSearchResult patients={patients} match={match} searchTerm="" />
  );

describe("<PatientSearchResult />", () => {
  it("renders a clickable card showing the patient's information", () => {
    renderPatientSearchResult();

    expect(screen.getByText("Smith John Mark")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText(/22 years/)).toBeInTheDocument();
    expect(screen.getByText(/28 - Apr - 1998/)).toBeInTheDocument();
    expect(screen.getByText("100HUN")).toBeInTheDocument();
  });
});
