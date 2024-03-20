import React from 'react';
import { Tile, InlineLoading } from '@carbon/react';
import styles from './metrics-tile.scss';
import { useTranslation } from 'react-i18next';

interface MetricTileProps {
  data: any[] | undefined;
  header: string;
}

const VisitTile: React.FC<MetricTileProps> = ({ data, header }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Tile className={styles.tileContainer}>
        <div>
          <div className={styles.tileContent}>
            <div className={styles.tileHeader}>
              <header>{t('tileHeader', header)}</header>
            </div>
            <div className={styles.displayDetails}>
              <div>Patients</div>
              <div className={styles.displayData}>{data?.length}</div>
            </div>
          </div>
        </div>
      </Tile>
    </React.Fragment>
  );
};

export default VisitTile;
