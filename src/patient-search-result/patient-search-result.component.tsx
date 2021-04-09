import React from "react";
import dayjs from "dayjs";
import { match } from "react-router-dom";
import {
  interpolateString,
  ExtensionSlot,
  useConfig
} from "@openmrs/esm-framework";
import { age } from "../contact-details/age-helpers";

const Patient: React.FC<{
  patient: fhir.Patient;
  patientResultUrl: string;
}> = ({ patient, patientResultUrl }) => {
  return (
    <ExtensionSlot
      key={patient.id}
      extensionSlotName="patient-card-slot"
      state={{
        patientUuid: patient.id,
        displayName: getPatientNames(patient),
        gender: patient.gender,
        birthDate: dayjs(patient.birthDate).format("DD - MMM - YYYY"),
        identifier: getPatientIdentifiers(patient),
        age: age(patient.birthDate),
        address: patient.address,
        telecom: patient.telecom,
        patientUrl: interpolateString(patientResultUrl, {
          patientUuid: patient.id
        })
      }}
    />
  );
};

const PatientSearchResults: React.FC<PatientSearchResultsProps> = ({
  patients
}) => {
  const config = useConfig();

  return (
    <>
      {patients.map(patient => (
        <Patient
          patient={patient}
          patientResultUrl={config.search.patientResultUrl}
        />
      ))}
    </>
  );
};

interface PatientSearchResultsProps {
  patients: Array<fhir.Patient>;
  searchTerm: string;
  match: match;
}
function getPatientNames(patient: fhir.Patient) {
  return `${patient.name[0].given.join(" ")} ${patient.name[0].family}`;
}

function getPatientIdentifiers(patient: fhir.Patient) {
  return patient.identifier.map(i => i.value);
}

export default PatientSearchResults;
