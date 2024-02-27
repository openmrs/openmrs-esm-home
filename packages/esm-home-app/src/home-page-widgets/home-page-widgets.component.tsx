import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';
import styles from './home-page-widgets.scss';
import HomepageHeader from '../homepage-header/homepage-header.component';
import { useTranslation } from 'react-i18next';

interface HomePageWidgetsProps {}

const HomePageWidgets: React.FC<HomePageWidgetsProps> = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <HomepageHeader title={t('home', 'Home')} />
      <ExtensionSlot className={styles.homePageWidget} name="homepage-widgets-slot" />
    </React.Fragment>
  );
};

export default HomePageWidgets;
