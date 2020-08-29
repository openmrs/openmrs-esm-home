import "./set-public-path";

const backendDependencies = {
  "webservices.rest": "2.24.0"
};

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

function setupOpenMRS() {
  return {
    lifecycle: () => import("./openmrs-esm-home"),
    activate: "home"
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
