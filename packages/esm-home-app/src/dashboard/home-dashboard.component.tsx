import React from 'react';
import { useConfig, ExtensionSlot, Extension } from '@openmrs/esm-framework';
import DashboardButton from '../dashboard-button/dashboard-button.component';
import styles from './home-dashboard.css';

export default function HomeDashboard() {
  const config = useConfig();

  return (
    <>
      <div className={styles.homeDashboard}>
        <section className={styles.mainSection}>
          <div className={styles.buttonArea}>
            <ExtensionSlot extensionSlotName="homepage-dashboard-slot">
              <div className={styles.homeButton}>
                <Extension />
              </div>
            </ExtensionSlot>
            {config.buttons.list.map((def) => (
              <DashboardButton {...def} key={def.label} />
            ))}
          </div>
          <div className={styles.widgetsArea}>
            <ExtensionSlot extensionSlotName="homepage-widgets-slot" />
          </div>
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
