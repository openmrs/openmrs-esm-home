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
    "@openmrs/esm-framework":
      "<rootDir>/__mocks__/openmrs-esm-framework.mock.tsx",
    "react-i18next": "<rootDir>/__mocks__/react-i18next.mock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};
