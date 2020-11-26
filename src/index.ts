import "./set-public-path";
import { getAsyncLifecycle } from "@openmrs/esm-react-utils";

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
    lifecycle: getAsyncLifecycle(() => import("./root.component"), {
      featureName: "home",
      moduleName: "@openmrs/esm-home-app"
    }),
    activate: "home",
    extensions: [
      {
        id: "active-visits-link",
        slot: "home-page-buttons",
        load: () => import("./refapp-links/active-visits")
      },
      {
        id: "capture-vitals-link",
        slot: "home-page-buttons",
        load: () => import("./refapp-links/capture-vitals")
      },
      {
        id: "appointment-scheduling-link",
        slot: "home-page-buttons",
        load: () => import("./refapp-links/appointment-scheduling")
      },
      {
        id: "reports-link",
        slot: "home-page-buttons",
        load: () => import("./refapp-links/reports")
      },
      {
        id: "data-management-link",
        slot: "home-page-buttons",
        load: () => import("./refapp-links/data-management")
      },
      {
        id: "configure-metadata-link",
        slot: "home-page-buttons",
        load: () => import("./refapp-links/configure-metadata")
      },
      {
        id: "system-administration-link",
        slot: "home-page-buttons",
        load: () => import("./refapp-links/system-administration")
      }
    ]
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
