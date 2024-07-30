import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import styles from './metrics.scss';

const Metrics: React.FC = () => {
  return <ExtensionSlot name="home-metrics-tiles-slot" className={styles.metricTilesSlot} />;
};

export default Metrics;
