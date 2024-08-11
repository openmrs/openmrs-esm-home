import React from 'react';
import { PageHeader, HomePictogram } from '@openmrs/esm-framework';
import styles from './page-header.scss';

interface PageHeaderProps {
  dashboardTitle: string;
}

const HomePageHeader: React.FC<PageHeaderProps> = ({ dashboardTitle }) => {
  return <PageHeader illustration={<HomePictogram />} title={dashboardTitle} className={styles.pageHeader} />;
};

export default HomePageHeader;
