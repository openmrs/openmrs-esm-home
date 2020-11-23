import React from "react";

export const defineConfigSchema = jest.fn();

export const validators = {
  isUrlWithTemplateParameters: jest.fn()
};

export const interpolateString = jest.fn().mockImplementation(s => s);

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

export const ConfigurableLink = props => (
  <a href={props.to} {...props}>
    {props.children}
  </a>
);

export const Type = {
  Array: "Array",
  Boolean: "Boolean",
  ConceptUuid: "ConceptUuid",
  Number: "Number",
  Object: "Object",
  String: "String",
  UUID: "UUID"
};

export const ModuleNameContext = React.createContext("fake-module-config");
