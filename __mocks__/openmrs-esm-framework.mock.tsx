import { never } from "rxjs";
import React from "react";

export function openmrsFetch() {
  return new Promise(() => {});
}

export const defineConfigSchema = jest.fn();

export const validators = {
  isUrlWithTemplateParameters: jest.fn()
};

export const interpolateString = jest.fn().mockImplementation(s => s);

export const Type = {
  Array: "Array",
  Boolean: "Boolean",
  ConceptUuid: "ConceptUuid",
  Number: "Number",
  Object: "Object",
  String: "String",
  UUID: "UUID"
};

export function createErrorHandler() {
  return jest.fn().mockReturnValue(never());
}

export const openmrsComponentDecorator = jest
  .fn()
  .mockImplementation(() => f => f);

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

export const ExtensionSlot = ({ children }) => <>{children}</>;

export const Extension = jest.fn().mockImplementation((props: any) => {
  return <slot />;
});

export const ConfigurableLink = props => (
  <a href={props.to} {...props}>
    {props.children}
  </a>
);

export const ComponentContext = React.createContext("fake-module-config");
