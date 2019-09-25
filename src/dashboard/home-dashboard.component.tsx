import React from "react";
import styles from "./home-dashboard.component.css";
import { Link, match } from "react-router-dom";
import { UserHasAccessReact } from "@openmrs/esm-api";

export default function HomeDashboard(props: HomeDashboardProps) {
  return (
    <>
      <div className={styles.homeDashboard}>
        <section className={styles.mainSection}>
          <UserHasAccessReact privilege="View Patients">
            <Link
              to={props.match.url + "/patient-search"}
              className={`omrs-link omrs-outlined-action omrs-rounded ${styles.dashboardLink}`}
            >
              <svg className="omrs-icon" fill="var(--omrs-color-interaction)">
                <use xlinkHref="#omrs-icon-search" />
              </svg>
              <span className={styles.label}>Search for patient</span>
            </Link>
          </UserHasAccessReact>
        </section>
      </div>
      <section className={styles.logoSection}>
        <svg>
          <use xlinkHref="#omrs-logo-full-mono" />
        </svg>
      </section>
    </>
  );
}

type HomeDashboardProps = {
  match: match;
};
