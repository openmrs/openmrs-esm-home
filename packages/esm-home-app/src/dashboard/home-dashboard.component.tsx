import React from 'react';
import { useParams } from 'react-router-dom';
import { useLayoutType, isDesktop, useExtensionStore, ExtensionSlot, WorkspaceContainer } from '@openmrs/esm-framework';
import type { DashboardConfig } from '../types/index';
import DashboardView from './dashboard-view.component';
import styles from './home-dashboard.scss';

interface Params {
  dashboard?: string; // Type the params to expect a dashboard name
}

export default function HomeDashboard() {
  const params = useParams<Params>();  // Typing the params with `Params` to handle dashboard
  const extensionStore = useExtensionStore();
  const layout = useLayoutType();

  // Get the ungrouped dashboards and ensure it's typed correctly
  const ungroupedDashboards: DashboardConfig[] =
    extensionStore.slots['homepage-dashboard-slot']?.assignedExtensions
      .map((e) => e.meta)
      .filter((e) => Object.keys(e).length) || [];

  // Find the active dashboard based on the params, fall back to the first dashboard if not found
  const activeDashboard =
    ungroupedDashboards.find((dashboard) => dashboard.name === params?.dashboard) || ungroupedDashboards[0];

  // Add a safeguard in case there are no dashboards
  if (!activeDashboard) {
    return <div>No dashboard available</div>;
  }

  return (
    <div className={styles.homePageWrapper}>
      <section className={isDesktop(layout) ? styles.dashboardContainer : styles.dashboardContainerTablet}>
        {isDesktop(layout) && <ExtensionSlot name="home-sidebar-slot" key={layout} />}
        <DashboardView title={activeDashboard.name} dashboardSlot={activeDashboard.slot} />
      </section>
      <WorkspaceContainer overlay contextKey="home" />
    </div>
  );
}
