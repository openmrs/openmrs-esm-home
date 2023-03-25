import React from 'react';
import { useLayoutType, isDesktop, useExtensionStore, ExtensionSlot } from '@openmrs/esm-framework';
import { useParams } from 'react-router-dom';
import DashboardView from './dashboard-view.component';
import type { DashboardConfig } from '../types/index';
import styles from './home-dashboard.scss';

export default function HomeDashboard() {
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
    <section className={isDesktop(layout) && styles.dashboardContainer}>
      {isDesktop(layout) && <ExtensionSlot name="home-sidebar-slot" key={layout} />}
      <DashboardView title={currentDashboard?.name} dashboardSlot={currentDashboard?.slot} />
    </section>
  );
}
