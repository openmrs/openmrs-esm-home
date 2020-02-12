import React from "react";

export const defineConfigSchema = jest.fn();

export const useConfig = jest
  .fn()
  .mockReturnValue({ buttons: { enabled: true } });

export const ModuleNameContext = React.createContext("fake-module-config");
