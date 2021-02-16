import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import { interpolateString } from "@openmrs/esm-config";
import { ConfigurableLink, useConfig } from "@openmrs/esm-react-utils";
import placeholder from "../assets/placeholder.png";
import styles from "./patient-search-result.scss";
import { SearchedPatient } from "../types";
import { fetchPatientPhotoUrl } from "@openmrs/esm-api";

const PatientSearchResult: React.FC<{ patient: SearchedPatient }> = ({
  patient
}) => {
  const config = useConfig();
  const [preferredId] = useState(
    patient.identifiers.find(i => i.preferred) || patient.identifiers[0]
  );
  const [patientPhoto, setPatientPhoto] = useState(placeholder);

  useEffect(() => {
    const ac = new AbortController();
    fetchPatientPhotoUrl(patient.uuid, ac).then(
      url => url && setPatientPhoto(url)
    );
    return () => ac.abort();
  }, [patient]);

  return (
    <ConfigurableLink
      key={patient.display}
      className={styles.patientCharts}
      to={interpolateString(config.search.patientResultUrl, {
        patientUuid: patient.uuid
      })}
    >
      <div className={styles.container}>
        <div className={styles.patientBanner}>
          <div className={styles.patientAvatar}>
            <img src={patientPhoto} alt="Patient avatar" />
          </div>
          <div className={styles.patientInfo}>
            <div>
              <span className={styles.patientName}>
                {patient.person.display}
              </span>
            </div>
            <div className={styles.demographics}>
              <span>{patient.person.gender === "M" ? "Male" : "Female"}</span>{" "}
              &middot;{" "}
              <span>
                {patient.person.age}{" "}
                {patient.person.age === 1 ? "year" : "years"}
              </span>{" "}
              &middot;{" "}
              <span>
                {dayjs(patient.person.birthdate).format("DD - MMM - YYYY")}
              </span>
            </div>
            <div>
              <span className={styles.identifiers}>
                {preferredId.identifier}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ConfigurableLink>
  );
};

export default PatientSearchResult;
