import React from "react";
import { Link, match } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { UserHasAccessReact } from "@openmrs/esm-api";
import { ExtensionSlotReact, ExtensionReact } from "@openmrs/esm-extensions";
import { useConfig } from "@openmrs/esm-config";
import DashboardButton from "../dashboard-button/dashboard-button.component";
import styles from "./home-dashboard.component.css";

export default function HomeDashboard(props: HomeDashboardProps) {
  const config = useConfig();
  const { t } = useTranslation();

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
                <span className={styles.label}>
                  {t("patientSearchPrompt", "Search for patient")}
                </span>
              </Link>
            </div>
            {config.buttons.enabled && (
              <ExtensionSlotReact
                extensionSlotName="home-page-buttons"
                className={styles.buttonArea}
              >
                <div className={styles.homeButton}>
                  <ExtensionReact />
                </div>
              </ExtensionSlotReact>
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

interface HomeDashboardProps {
  match: match;
}
