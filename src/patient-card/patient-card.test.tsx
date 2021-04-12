import React from "react";
import { render, screen } from "@testing-library/react";
import PatientCard from "./patient-card-component";

const match = { params: {}, isExact: true, path: "", url: "" };

const patient = {
  patientUuid: "c8d0d614-00f7-4234-a09e-058952587778",
  displayName: "Kinene Samson",
  gender: "Male",
  birthDate: "17 - Sep - 1933",
  identifier: "1032N7",
  age: "87 years",
  address: []
};

const renderPatientCard = () =>
  render(
    <PatientCard
      patientUuid={patient.patientUuid}
      displayName={patient.displayName}
      gender={patient.gender}
      age={patient.age}
      birthDate={patient.birthDate}
      identifier={patient.identifier}
      address={patient.address}
      telecom={undefined}
    />
  );

describe("<PatientCard />", () => {
  it("renders a clickable card showing the patient's information", () => {
    renderPatientCard();

    expect(screen.getByText("Kinene Samson")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText(/87 years/)).toBeInTheDocument();
    expect(screen.getByText(/17 - Sep - 1933/)).toBeInTheDocument();
    expect(screen.getByText("1032N7")).toBeInTheDocument();
    expect(screen.getByText("Show Contact Details")).toBeInTheDocument();
  });
});
