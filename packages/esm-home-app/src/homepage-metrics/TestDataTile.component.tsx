import React from 'react';
import { Tile, Layer } from '@carbon/react';
import styles from './home-metrics-widget.scss';
import { ArrowRight } from '@carbon/react/icons';

interface DataTileProps {}

const DataTile = () => {
  const dataValue = 'default';
  return (
    <React.Fragment>
      <Layer className={styles.container}>
        <Tile className={styles.tileContainer}>
          <div>
            <h2>Data to display: {dataValue}</h2>
          </div>
        </Tile>
      </Layer>
    </React.Fragment>
  );
};

export default DataTile;
