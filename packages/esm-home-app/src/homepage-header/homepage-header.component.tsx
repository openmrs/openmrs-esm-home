import React from 'react';
import { useTranslation } from 'react-i18next';
import { Location } from '@carbon/react/icons';
import { ConfigObject, useConfig, useSession } from '@openmrs/esm-framework';
import { DatePicker, DatePickerInput } from '@carbon/react';
import dayjs from 'dayjs';
import styles from './homepage-header.scss';
import HomepageIllustration from './homepage-illustration.component';
import { HomepageHeaderDate } from '../homepage-header-date/homepage-header-date.component';

interface HomepageHeaderProps {
  dashboardTitle: string;
}

const HomepageHeader: React.FC<HomepageHeaderProps> = ({ dashboardTitle }) => {
  const { t } = useTranslation();
  const session = useSession();
  const location = session?.sessionLocation?.display;
  const config = useConfig() as ConfigObject;

  return (
    <div className={styles.header} role="banner">
      <div className={styles['left-justified-items']}>
        <HomepageIllustration />
        <div className={styles['page-labels']}>
          <p>{t('home', config.appNameLabel)}</p>
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
