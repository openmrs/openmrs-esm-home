import React from 'react';
import { navigate } from '@openmrs/esm-framework';
import { SideNavLink } from '@carbon/react';

export const spaBasePath = `${window.spaBase}/home`;

export interface DashboardLinkConfig {
  name: string;
  title: string;
  renderIcon?: React.ComponentType<any>;
}

export const createDashboardLink = (db: DashboardLinkConfig) => {
  const DashboardLink: React.FC = () => {
    return (
      <SideNavLink
        key={db.name}
        renderIcon={db.renderIcon}
        href={`${spaBasePath}/${db.name}`}
        onClick={(e) => {
          e.preventDefault();
          navigate({ to: `${spaBasePath}/${db.title}` });
        }}
      >
        {db.name}
      </SideNavLink>
    );
  };
  return DashboardLink;
};
