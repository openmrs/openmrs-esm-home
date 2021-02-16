import React from "react";
import { SearchedPatient } from "../types";
import PatientSearchResult from "./search-result.component";

const PatientSearchResults: React.FC<{ patients: Array<SearchedPatient> }> = ({
  patients
}) => (
  <>
    {patients.map(patient => (
      <PatientSearchResult patient={patient} key={patient.uuid} />
    ))}
  </>
);

export default PatientSearchResults;
