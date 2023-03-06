import React from 'react';
import { useLayoutType, isDesktop, useExtensionStore, ExtensionSlot, useConfig } from '@openmrs/esm-framework';
import styles from './home-dashboard.scss';
import { useParams } from 'react-router-dom';
import { DashboardConfig } from '../types/index';
import DashboardView from './dashboard-view.component';

export default function HomeDashboard() {
  const config = useConfig();
  const params = useParams();
  const extensionStore = useExtensionStore();
  const layout = useLayoutType();
  const ungroupedDashboards =
    extensionStore.slots['homepage-dashboard-slot']?.assignedExtensions
      .map((e) => e.meta)
      .filter((e) => Object.keys(e).length) || [];
  const dashboards = ungroupedDashboards as Array<DashboardConfig>;
  const currentDashboard = dashboards.find((dashboard) => dashboard.name === params?.view) || dashboards[0];

  return (
    <>
      <section className={isDesktop(layout) && styles.dashboardContainer}>
        {isDesktop(layout) && <ExtensionSlot extensionSlotName="home-sidebar-slot" key={layout} />}
        <DashboardView title={currentDashboard?.name} dashboardSlot={currentDashboard?.slot} />
        {config.showOpenMRSLogo && (
          <section className={styles.logoSection}>
            <svg>
              <use xlinkHref="#omrs-logo-full-mono" />
            </svg>
          </section>
        )}
      </section>
    </>
  );
}
