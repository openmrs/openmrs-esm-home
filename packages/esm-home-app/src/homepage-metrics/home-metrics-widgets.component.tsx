import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';
import styles from './home-metrics-widgets.scss';

interface HomeMetricsWidgetProps {}

const HomeMetricsWidgets: React.FC<HomeMetricsWidgetProps> = () => {
  return <ExtensionSlot className={styles.homeMetricsWidget} name="home-metrics-widgets-slot" />;
};

export default HomeMetricsWidgets;
