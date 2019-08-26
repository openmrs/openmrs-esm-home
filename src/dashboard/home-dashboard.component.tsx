import React from "react";
import styles from "./home-dashboard.component.css";
import { Link, match } from "react-router-dom";

export default function HomeDashboard(props: HomeDashboardProps) {
  return (
    <div className={styles.homeDashboard}>
      <section className={styles.mainSection}>
        <Link
          to={props.match.url + "/patient-search"}
          className={`omrs-unstyled ${styles.patientSearchLink}`}
        >
          <svg className="omrs-icon" fill="var(--omrs-color-interaction)">
            <use xlinkHref="#omrs-icon-search" />
          </svg>
          <span className={styles.label}>Search for patient</span>
        </Link>
      </section>
      <section className={styles.logoSection}>
        <svg>
          <use xlinkHref="#omrs-logo-full-mono" />
        </svg>
      </section>
    </div>
  );
}

type HomeDashboardProps = {
  match: match;
};
