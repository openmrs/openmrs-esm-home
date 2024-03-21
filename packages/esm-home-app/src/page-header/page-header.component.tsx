import React from 'react';
import { useTranslation } from 'react-i18next';
import { Location } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';
import styles from './page-header.scss';
import HomepageIllustration from './page-illustration.component';
import { HomepageHeaderDate } from '../page-header-date/page-header-date.component';

interface HomepageHeaderProps {
  dashboardTitle: string;
}

const HomepageHeader: React.FC<HomepageHeaderProps> = ({ dashboardTitle }) => {
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
          <HomepageHeaderDate />
        </div>
      </div>
    </div>
  );
};

export default HomepageHeader;
