import React from 'react';
import styles from '../visits-tile/visits-tile.scss';
import { useTranslation } from 'react-i18next';
import { Tile, Layer, InlineLoading } from '@carbon/react';
import useActiveVisits from '../../hooks/useActiveVisits';

const VisitSummary: React.FC = () => {
  const { data, isLoading } = useActiveVisits();
  const { t } = useTranslation();

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
              <header>
                {t('totalVisitsToday', 'Total Visits Today')} : {data?.results.length ?? 0}
              </header>
            )}
          </div>
        </Tile>
      </Layer>
    </React.Fragment>
  );
};

export default VisitSummary;
