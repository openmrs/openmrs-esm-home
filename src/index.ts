import "./set-public-path";
import { attach } from "@openmrs/esm-extensions";

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
    activate: "home",
    extensions: [
      {
        name: "active-visits-link",
        load: () => import("./refapp-links/active-visits")
      },
      {
        name: "capture-vitals-link",
        load: () => import("./refapp-links/capture-vitals")
      },
      {
        name: "reports-link",
        load: () => import("./refapp-links/reports")
      },
      {
        name: "appointment-scheduling",
        load: () => import("./refapp-links/appointment-scheduling")
      }
    ]
  };
}

attach("home-page-buttons", "active-visits-link");
attach("home-page-buttons", "capture-vitals-link");
attach("home-page-buttons", "reports-link");
attach("home-page-buttons", "appointment-scheduling");

export { backendDependencies, importTranslation, setupOpenMRS };
