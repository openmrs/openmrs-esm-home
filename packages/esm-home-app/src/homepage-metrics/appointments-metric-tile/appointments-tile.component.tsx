import React from 'react';
import { Tile, Layer, InlineLoading } from '@carbon/react';
import { useAppointmentsData } from '../../hooks/useAppointmentsData';
import styles from '../appointments-metric-tile/appointments-tile.scss';

const AppointmentsTile: React.FC = () => {
  const { responseData: data, error, isLoading } = useAppointmentsData();

  return (
    <React.Fragment>
      <Layer className={styles.container}>
        <Tile className={styles.tileContainer}>
          <div className={styles.tileHeader}>
            {isLoading ? (
              <div className={styles.loadingSpinner}>
                <InlineLoading />
              </div>
            ) : (
              <header>Scheduled for Today: {data?.length}</header>
            )}
          </div>
        </Tile>
      </Layer>
    </React.Fragment>
  );
};

export default AppointmentsTile;
