import { defineConfigSchema, validators, Type } from "@openmrs/esm-config";
import { getAsyncLifecycle } from "@openmrs/esm-react-utils";

const backendDependencies = {
  "webservices.rest": "2.24.0",
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
    moduleName,
  };

  defineConfigSchema(moduleName, {
    buttons: {
      enabled: {
        _type: Type.Boolean,
        _default: true,
        _description:
          "Whether to show big buttons on the home page (including extensions)",
      },
      list: {
        _type: Type.Array,
        _elements: {
          label: { _type: Type.String },
          link: {
            _type: Type.String,
            _validators: [validators.isUrl],
          },
          requiredPrivilege: {
            _type: Type.String,
          },
          spa: {
            _type: Type.Boolean,
            _default: false,
          },
        },
        _default: [],
        _description:
          "Custom buttons to add, which will come after the button extensions",
      },
    },
    search: {
      patientResultUrl: {
        _default: "${openmrsSpaBase}/patient/${patientUuid}/chart",
        _description:
          "Where clicking a patient result takes the user. Accepts template parameter ${patientUuid}",
        _validators: [validators.isUrlWithTemplateParameters(["patientUuid"])],
      },
    },
  });

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
        ),
      },
      {
        id: "capture-vitals-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/capture-vitals"),
          options
        ),
      },
      {
        id: "appointment-scheduling-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/appointment-scheduling"),
          options
        ),
      },
      {
        id: "reports-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/reports"),
          options
        ),
      },
      {
        id: "data-management-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/data-management"),
          options
        ),
      },
      {
        id: "configure-metadata-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/configure-metadata"),
          options
        ),
      },
      {
        id: "system-administration-link",
        slot: "home-page-buttons",
        load: getAsyncLifecycle(
          () => import("./refapp-links/system-administration"),
          options
        ),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
