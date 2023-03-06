import React from 'react';
import { LeftNavMenu } from '@openmrs/esm-framework';
import styles from './sidemenu.scss';

const SideMenu = () => <LeftNavMenu className={styles.sideMenu} isFixedNav expanded isChildOfHeader={true} />;

export default SideMenu;
