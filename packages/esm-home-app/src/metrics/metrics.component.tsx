import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';
import styles from './metrics.scss';

const Metrics: React.FC = () => {
  return <ExtensionSlot name="home-metrics-tiles-slot" className={styles.container} />;
};

export default Metrics;
