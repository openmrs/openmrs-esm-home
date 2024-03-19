import React from 'react';
import useVisitSummary from '../../hooks/useVisitSummary';
import { Tile, Layer, InlineLoading } from '@carbon/react';
import styles from '../visits-tile/visits-tile.scss';

const VisitTile: React.FC = () => {
  const { data, isLoading } = useVisitSummary();

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
              <header>Active Visits: {data?.results.length ?? 0}</header>
            )}
          </div>
        </Tile>
      </Layer>
    </React.Fragment>
  );
};

export default VisitTile;
