import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';
import styles from './metrics.scss';

const Metrics: React.FC = () => {
  return <ExtensionSlot className={styles.metrics} name="home-metrics-tiles-slot" />;
};

export default Metrics;
