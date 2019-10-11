import React from "react";
import styles from "./patient-search-result.component.css";
import dayjs from "dayjs";
import { always } from "kremling";
import { Link, match } from "react-router-dom";

export default function PatientSearchResults(props: PatientSearchResultsProps) {
  return props.patients.map(patient => renderPatient(patient));

  function highlight(property) {
    return property.toLowerCase().includes(props.searchTerm.toLowerCase());
  }

  function renderPatient(patient) {
    const preferredIdentifier =
      patient.identifiers.find(i => i.preferred) || patient.identifiers[0];

    return (
      <Link
        key={patient.display}
        className={styles.patientResult}
        to={`/patient/${patient.uuid}/chart`}
      >
        <span className={styles.resultNumber}>{patient.index}</span>
        <div className={styles.patientCard}>
          <div className={styles.patientNameContainer}>
            <span
              className={always("omrs-type-title-5")
                .always("omrs-bold")
                .always(styles.patientName)
                .maybe(styles.highlight, highlight(patient.person.display))}
            >
              {patient.person.display}
            </span>
            <button className="omrs-unstyled">
              <svg className="omrs-icon" fill="var(--omrs-color-interaction)">
                <use xlinkHref="#omrs-icon-chevron-right"></use>
              </svg>
            </button>
          </div>
          <div className={styles.patientDetailsContainer}>
            <div className={styles.tile}>
              <div className={styles.patientData}>{patient.person.gender}</div>
            </div>
            <div className={styles.tile}>
              <div className={styles.patientData}>{patient.person.age}</div>
              <div className={styles.patientDataLabel}>years</div>
            </div>
            <div className={styles.tile}>
              <div className={styles.patientData}>
                {dayjs(patient.person.birthdate).format("DD-MMM-YYYY")}
              </div>
              <div className={styles.patientDataLabel}>birth date</div>
            </div>
            <div className={styles.tile}>
              <div
                className={always(styles.patientData).maybe(
                  styles.highlight,
                  highlight(preferredIdentifier.identifier)
                )}
              >
                {preferredIdentifier.identifier}
              </div>
              <div className={styles.patientDataLabel}>
                {preferredIdentifier.identifierType.display}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

type PatientSearchResultsProps = {
  patients: any;
  searchTerm: string;
  match: match;
};
