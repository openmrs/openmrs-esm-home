import React from 'react';
import AppointmentsTile from './appointments-metric-tile/appointments-tile.component';
import ActiveVisitTile from './visits-tile/visits-tile.component';
import styles from '../homepage-metrics/home-metrics-widget.scss';
import VisitSummary from './visit-summary-tile/visit-summary.component';

const MetricsContainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <AppointmentsTile />
      <ActiveVisitTile />
      <VisitSummary />
    </div>
  );
};

export default MetricsContainer;
