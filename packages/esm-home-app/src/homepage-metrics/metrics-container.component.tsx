import React from 'react';
import MetricTile from './metrics-tile/metrics-tile.component';
import styles from '../homepage-metrics/home-metrics-widget.scss';
import useAppointmentsData from '../hooks/useAppointmentsData';
import useActiveVisits from '../hooks/useActiveVisits';
import useVisitSummary from '../hooks/useVisitSummary';

const MetricsContainer: React.FC = () => {
  const { data: appointmentsData } = useAppointmentsData();
  const { data: activeVisitsData } = useActiveVisits();
  const { data: visitSummaryData } = useVisitSummary();

  return (
    <div className={styles.container}>
      <MetricTile data={appointmentsData} header="Scheduled For Today" />
      <MetricTile data={activeVisitsData} header="Active Visits" />
      <MetricTile data={visitSummaryData} header="Total Visits Today" />
    </div>
  );
};

export default MetricsContainer;
