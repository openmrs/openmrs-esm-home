import React from 'react';
import { useTranslation } from 'react-i18next';
import { Location } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';
import HomepageIllustration from './page-illustration.component';
import HeaderDate from '../header-date/header-date.component';
import styles from './page-header.scss';

interface PageHeaderProps {
  dashboardTitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ dashboardTitle }) => {
  const { t } = useTranslation();
  const session = useSession();
  const location = session?.sessionLocation?.display;

  return (
    <div className={styles.header} role="banner">
      <div className={styles['left-justified-items']}>
        <HomepageIllustration />
        <div className={styles['page-labels']}>
          <p>{t('home', 'Home')}</p>
          <p className={styles['page-name']}>{dashboardTitle}</p>
        </div>
      </div>
      <div className={styles['right-justified-items']}>
        <div className={styles['date-and-location']}>
          <Location size={16} />
          <span className={styles.value}>{location}</span>
          <span className={styles.middot}>&middot;</span>
          <HeaderDate />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
