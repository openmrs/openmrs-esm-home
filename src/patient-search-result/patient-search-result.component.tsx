import React from "react";
import dayjs from "dayjs";
import styles from "./patient-search-result.scss";
import { match } from "react-router-dom";
import {
  interpolateString,
  ExtensionSlot,
  useConfig
} from "@openmrs/esm-framework";
import { age } from "../contact-details/age-helpers";
import { PatientCardProps } from "../patient-card/patient-card-component";

const PatientSearchResults: React.FC<PatientSearchResultsProps> = ({
  patients
}) => {
  const config = useConfig();

  function renderPatient(patient: fhir.Patient) {
    const state: PatientCardProps = {
      patientUuid: patient.id,
      displayName: getPatientNames(patient),
      gender: patient.gender,
      birthDate: dayjs(patient.birthDate).format("DD - MMM - YYYY"),
      identifier: getPatientIdentifiers(patient),
      age: age(patient.birthDate),
      address: patient.address,
      telecom: patient.telecom,
      patientUrl: interpolateString(config.search.patientResultUrl, {
        patientUuid: patient.id
      })
    };

    return (
      <ExtensionSlot
        key={patient.id}
        extensionSlotName="patient-card-slot"
        state={state}
      />
    );
  }

  return <>{patients.map(patient => renderPatient(patient))}</>;
};

interface PatientSearchResultsProps {
  patients: Array<fhir.Patient>;
  searchTerm: string;
  match: match;
}
function getPatientNames(patient) {
  return `${patient.name[0].given.join(" ")} ${patient.name[0].family}`;
}

function getPatientIdentifiers(patient) {
  return patient.identifier.map(i => i.value);
}

export default PatientSearchResults;
