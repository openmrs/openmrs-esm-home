import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';
import styles from './home-page-widgets.scss';

interface HomePageWidgetsProps {}

const HomePageWidgets: React.FC<HomePageWidgetsProps> = () => {
  return <ExtensionSlot className={styles.homePageWidget} name="homepage-widgets-slot" />;
};

export default HomePageWidgets;
