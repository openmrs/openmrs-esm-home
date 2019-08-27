import React from "react";
import { match } from "react-router";
import styles from "./patient-search.component.css";

export default function PatientSearch(props: PatientSearchProps) {
  return (
    <div>
      <div className={styles.patientSearchHeader}>
        <button onClick={props.history.goBack} className={styles.iconBtn}>
          <svg className="omrs-icon" fill="var(--omrs-color-interaction)">
            <use xlinkHref="#omrs-icon-arrow-back" />
          </svg>
        </button>
        <input
          className={`omrs-type-title-5 ${styles.patientSearchInput}`}
          placeholder="Search for patient"
          autoFocus
        />
      </div>
      <div className="searchHelper">
        <p className={`omrs-type-body-regular ${styles.helperText}`}>
          Search by <span className="omrs-bold">patient number</span>
        </p>
        <p className={`omrs-type-body-regular ${styles.helperText}`}>
          If unsuccessful, try patient name
        </p>
      </div>
    </div>
  );
}

type PatientSearchProps = {
  match?: match;
  history?: any;
};
