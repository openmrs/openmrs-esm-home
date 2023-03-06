import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import styles from './dashboard-view.scss';

const DashboardView: React.FC<{ dashboardSlot: string; title: string }> = ({ dashboardSlot, title }) => {
  return (
    <ExtensionSlot
      className={styles.dashboardView}
      extensionSlotName={dashboardSlot}
      state={{ dashboardTitle: title }}
    />
  );
};

export default DashboardView;
