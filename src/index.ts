import { registerBreadcrumbs } from "@openmrs/esm-api";
import { defineConfigSchema } from "@openmrs/esm-config";
import { getAsyncLifecycle } from "@openmrs/esm-react-utils";
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

  const options = {
    featureName: "home",
    moduleName
  };

  defineConfigSchema(moduleName, esmHomeSchema);

  registerBreadcrumbs([
    {
      path: "/openmrs/spa/home",
      title: "Home"
    }
  ]);

  return {
    lifecycle: getAsyncLifecycle(() => import("./root.component"), options),
    activate: "home",
    extensions: [
      {
        id: "active-visits-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/active-visits"),
          options
        )
      },
      {
        id: "capture-vitals-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/capture-vitals"),
          options
        )
      },
      {
        id: "appointment-scheduling-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/appointment-scheduling"),
          options
        )
      },
      {
        id: "reports-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(() => import("./refapp-links/reports"), options)
      },
      {
        id: "data-management-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/data-management"),
          options
        )
      },
      {
        id: "configure-metadata-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/configure-metadata"),
          options
        )
      },
      {
        id: "system-administration-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/system-administration"),
          options
        )
      }
    ]
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
