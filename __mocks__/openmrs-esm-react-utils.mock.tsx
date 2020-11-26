import React from "react";

export const openmrsRootDecorator = jest.fn().mockImplementation(() => f => f);

export const UserHasAccess = jest.fn().mockImplementation((props: any) => {
  return props.children;
});

export const useConfig = jest.fn().mockReturnValue({
  buttons: {
    enabled: true,
    list: [
      {
        label: "SPA Page",
        link: "${openmrsSpaBase}/route"
      },
      {
        label: "RefApp Page",
        link: "${openmrsBase}/some/route"
      }
    ]
  },
  search: {
    links: {
      patientResult: "${openmrsSpaBase}/${patientUuid}/chart"
    }
  }
});

export const ExtensionSlot = jest.fn().mockImplementation((props: any) => {
  return props.children;
});

export const Extension = jest.fn().mockImplementation((props: any) => {
  return <slot />;
});

export const ConfigurableLink = props => (
  <a href={props.to} {...props}>
    {props.children}
  </a>
);

export const ModuleNameContext = React.createContext("fake-module-config");
