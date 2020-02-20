import React from "react";

export const defineConfigSchema = jest.fn();

export const validators = {
  isBoolean: jest.fn(),
  isString: jest.fn()
};

export const useConfig = jest.fn().mockReturnValue({
  buttons: {
    enabled: true,
    list: [
      {
        label: "SPA Page",
        link: {
          spa: true,
          url: "/some/route"
        }
      },
      {
        label: "RefApp Page",
        link: {
          spa: false,
          url: "/openmrs/some/route"
        }
      }
    ]
  }
});

export const ModuleNameContext = React.createContext("fake-module-config");
