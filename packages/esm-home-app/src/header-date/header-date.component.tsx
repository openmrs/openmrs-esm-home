import React from 'react';
import { Calendar } from '@carbon/react/icons';
import { formatDate } from '@openmrs/esm-framework';
import styles from './header-date.scss';

const HeaderDate: React.FC = () => {
  return (
    <>
      <Calendar size={16} />
      <span className={styles.value}>{formatDate(new Date(), { mode: 'standard' })}</span>
    </>
  );
};

export default HeaderDate;
