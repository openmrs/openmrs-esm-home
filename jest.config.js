module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(s?css)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/file.mock.ts",
    "^@carbon/icons-react/es/(.*)$": "@carbon/icons-react/lib/$1",
    "^carbon-components-react/es/(.*)$": "carbon-components-react/lib/$1",
    "lodash-es/debounce": "<rootDir>/__mocks__/debounce.mock.ts",
    "lodash-es/isEmpty": "<rootDir>/__mocks__/isEmpty.mock.ts",
    "@openmrs/esm-api": "<rootDir>/__mocks__/openmrs-esm-api.mock.tsx",
    "@openmrs/esm-error-handling":
      "<rootDir>/__mocks__/openmrs-esm-error-handling.mock.tsx",
    "@openmrs/esm-config": "<rootDir>/__mocks__/openmrs-esm-config.mock.tsx",
    "@openmrs/esm-react-utils":
      "<rootDir>/__mocks__/openmrs-esm-react-utils.mock.tsx",
    "react-i18next": "<rootDir>/__mocks__/react-i18next.mock.js",
    "@openmrs/esm-extensions":
      "<rootDir>/__mocks__/openmrs-esm-extensions.mock.tsx"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};
