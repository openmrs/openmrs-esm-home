import React from 'react';
import { Calendar } from '@carbon/react/icons';
import styles from './homepage-header-date.scss';
import { formatDate } from '@openmrs/esm-framework';

export const HomepageHeaderDate = () => {
  return (
    <React.Fragment>
      <Calendar size={16} />
      <span className={styles.value}>{formatDate(new Date(), { mode: 'standard' })}</span>
    </React.Fragment>
  );
};
