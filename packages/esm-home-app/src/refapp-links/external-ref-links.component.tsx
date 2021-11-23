import React from 'react';
import { useConfig, ConfigurableLink } from '@openmrs/esm-framework';
import styles from '../root.scss';
import { Launch16 } from '@carbon/icons-react';

const ExternalRefLinks: React.FC<{}> = () => {
  const config = useConfig();

  return config?.externalRefLinks?.enabled ? (
    <div className={styles.externalLinks}>
      {config?.externalRefLinks?.links?.map((link) => (
        <a target="_blank" href={link?.redirect}>
          {link?.title}
          <Launch16 className={styles.launchIcon} />
        </a>
      ))}
    </div>
  ) : null;
};

export default ExternalRefLinks;
