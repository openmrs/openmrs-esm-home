import React from 'react';
import { Tile, Layer, InlineLoading } from '@carbon/react';
import styles from './home-metrics-widget.scss';
import { ArrowRight } from '@carbon/react/icons';
import { useTestdata } from '../hooks/useTestData';

interface DataTileProps {}

const DataTile = () => {
  const { responseData: data, error, isLoading } = useTestdata();

  // console.log(data, isLoading);
  return isLoading ? (
    <div>
      <InlineLoading />
    </div>
  ) : (
    <React.Fragment>
      <Layer className={styles.container}>
        <Tile className={styles.tileContainer}>
          <div className={styles.tileHeader}>
            <header>Data to display: {data?.length}</header>
          </div>
        </Tile>
      </Layer>
    </React.Fragment>
  );
};

export default DataTile;
