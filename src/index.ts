import {
  registerBreadcrumbs,
  defineConfigSchema,
  getAsyncLifecycle
} from "@openmrs/esm-framework";
import { esmHomeSchema } from "./openmrs-esm-home-schema";

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
  const moduleName = "@openmrs/esm-home-app";
  const pageName = "home";

  const options = {
    featureName: pageName,
    moduleName
  };

  defineConfigSchema(moduleName, esmHomeSchema);

  registerBreadcrumbs([
    {
      path: `${window.spaBase}/${pageName}`,
      title: "Home"
    }
  ]);

  return {
    lifecycle: getAsyncLifecycle(() => import("./root.component"), options),
    activate: pageName,
    extensions: [
      {
        id: "active-visits-link",
        slot: "homepage-dashboard-slot",
        load: getAsyncLifecycle(
          () => import("./refapp-links/active-visits"),
          options
        )
      },
      {
        id: "capture-vitals-link",
        slot: "homepage-dashboard-slot",
        load: getAsyncLifecycle(
          () => import("./refapp-links/capture-vitals"),
          options
        )
      },
      {
        id: "appointment-scheduling-link",
        slot: "homepage-dashboard-slot",
        load: getAsyncLifecycle(
          () => import("./refapp-links/appointment-scheduling"),
          options
        )
      },
      {
        id: "reports-link",
        slot: "homepage-dashboard-slot",
        load: getAsyncLifecycle(() => import("./refapp-links/reports"), options)
      },
      {
        id: "data-management-link",
        slot: "homepage-dashboard-slot",
        load: getAsyncLifecycle(
          () => import("./refapp-links/data-management"),
          options
        )
      },
      {
        id: "configure-metadata-link",
        slot: "homepage-dashboard-slot",
        load: getAsyncLifecycle(
          () => import("./refapp-links/configure-metadata"),
          options
        )
      },
      {
        id: "system-administration-link",
        slot: "homepage-dashboard-slot",
        load: getAsyncLifecycle(
          () => import("./refapp-links/system-administration"),
          options
        )
      }
    ]
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
