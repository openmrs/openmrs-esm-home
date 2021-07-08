import React from 'react';
import { match } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConfig, ExtensionSlot, Extension } from '@openmrs/esm-framework';
import DashboardButton from '../dashboard-button/dashboard-button.component';
import styles from './home-dashboard.component.css';

export interface HomeDashboardProps {
  match: match;
  canSearch: boolean;
}

export default function HomeDashboard({ match, canSearch }: HomeDashboardProps) {
  const config = useConfig();
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.homeDashboard}>
        <section className={styles.mainSection}>
          {config.buttons.enabled && (
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
          )}
          {config.widgets.enabled && (
            <div style={{ marginTop: '2rem' }}>
              <ExtensionSlot extensionSlotName="homepage-widgets-slot" />
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
