import React from "react";
import { Link, match } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useConfig,
  UserHasAccess,
  ExtensionSlot,
  Extension
} from "@openmrs/esm-framework";
import DashboardButton from "../dashboard-button/dashboard-button.component";
import styles from "./home-dashboard.component.css";

export interface HomeDashboardProps {
  match: match;
}

export default function HomeDashboard(props: HomeDashboardProps) {
  const config = useConfig();
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.homeDashboard}>
        <section className={styles.mainSection}>
          <UserHasAccess privilege="View Patients">
            <div className={styles.searchLinkArea}>
              <Link
                to={props.match.url + "/patient-search"}
                className={`omrs-link omrs-outlined-action omrs-rounded ${styles.dashboardLink}`}
              >
                <svg className="omrs-icon" fill="var(--omrs-color-interaction)">
                  <use xlinkHref="#omrs-icon-search" />
                </svg>
                <span className={styles.label}>
                  {t("patientSearchPrompt", "Search for patient")}
                </span>
              </Link>
            </div>
          </UserHasAccess>
          {config.buttons.enabled && (
            <div className={styles.buttonArea}>
              <ExtensionSlot extensionSlotName="homepage-dashboard-slot">
                <div className={styles.homeButton}>
                  <Extension />
                </div>
              </ExtensionSlot>
              {config.buttons.list.map(def => (
                <DashboardButton {...def} key={def.label} />
              ))}
            </div>
          )}
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
