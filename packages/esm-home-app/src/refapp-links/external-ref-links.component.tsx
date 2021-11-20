import React from 'react';
import { useConfig, ConfigurableLink } from '@openmrs/esm-framework';
import styles from '../root.scss';
import { ArrowUpRight16 } from '@carbon/icons-react';

const ExternalRefLinks: React.FC<{}> = () => {
  const config = useConfig();

  return config?.externalRefLinks?.enabled ? (
    <div className={styles.externalLinks}>
      {config?.externalRefLinks?.links?.map((link) => (
        <ConfigurableLink to={link?.redirect}>
          {link?.title}
          <ArrowUpRight16 className={styles.topRightArrow} />
        </ConfigurableLink>
      ))}
    </div>
  ) : null;
};

export default ExternalRefLinks;
