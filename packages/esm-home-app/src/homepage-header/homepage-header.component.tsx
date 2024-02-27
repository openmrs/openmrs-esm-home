import React from 'react';
import { useTranslation } from 'react-i18next';
import { Location } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';
import { DatePicker, DatePickerInput } from '@carbon/react';
import dayjs from 'dayjs';
import styles from './homepage-header.scss';
import HomepageIllustration from './homepage-illustration.component';

interface HomepageHeaderProps {
  title: string;
}

const HomepageHeader: React.FC<HomepageHeaderProps> = ({ title }) => {
  const { t } = useTranslation();
  const session = useSession();
  const location = session?.sessionLocation?.display;

  return (
    <div className={styles.header} data-testid="homepage-header">
      <div className={styles['left-justified-items']}>
        <HomepageIllustration />
        <div className={styles['page-labels']}>
          <p>{t('home', 'Home')}</p>
          <p className={styles['page-name']}>{title}</p>
        </div>
      </div>
      <div className={styles['right-justified-items']}>
        <div className={styles['date-and-location']}>
          <Location size={16} />
          <span className={styles.value}>{location}</span>
          <span className={styles.middot}>&middot;</span>
          <DatePicker dateFormat="d-M-Y" datePickerType="single">
            <DatePickerInput
              style={{ backgroundColor: 'transparent', border: 'none', maxWidth: '10rem' }}
              id="date-picker-calendar-id"
              placeholder="DD-MMM-YYYY"
              labelText=""
              type="text"
              value={dayjs(new Date()).format('DD MMM YYYY')}
            />
          </DatePicker>
        </div>
      </div>
    </div>
  );
};

export default HomepageHeader;
