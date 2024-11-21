import React from 'react';
import { useTranslation } from 'react-i18next';
import { HomePictogram, PageHeader } from '@openmrs/esm-framework';
import styles from './page-header.scss';

interface PageHeaderProps {
  dashboardTitle: string;
}

const HomePageHeader: React.FC<PageHeaderProps> = ({ dashboardTitle }) => {
  const { t } = useTranslation();

  /**
   * Translation for the home page header
   * // t('home', 'Home')
   */
  return <PageHeader className={styles.pageHeader} illustration={<HomePictogram />} title={t(dashboardTitle)} />;
};

export default HomePageHeader;
