import React from "react";
import styles from "./home-dashboard.component.css";
import { Link, match } from "react-router-dom";
import { UserHasAccessReact } from "@openmrs/esm-api";
import { useConfig } from "@openmrs/esm-module-config";
import DashboardButton from "../dashboard-button/dashboard-button.component";

export default function HomeDashboard(props: HomeDashboardProps) {
  const config = useConfig();
  const buttons = config.buttons.list.map(def => (
    <DashboardButton {...def} key={def.label} />
  ));
  return (
    <>
      <div className={styles.homeDashboard}>
        <section className={styles.mainSection}>
          <UserHasAccessReact privilege="View Patients">
            <div className={styles.searchLinkArea}>
              <Link
                to={props.match.url + "/patient-search"}
                className={`omrs-link omrs-outlined-action omrs-rounded ${styles.dashboardLink}`}
              >
                <svg className="omrs-icon" fill="var(--omrs-color-interaction)">
                  <use xlinkHref="#omrs-icon-search" />
                </svg>
                <span className={styles.label}>Search for patient</span>
              </Link>
            </div>
            {config.buttons.enabled && (
              <div className={styles.buttonArea}>{buttons}</div>
            )}
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
