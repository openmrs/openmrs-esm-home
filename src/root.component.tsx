import React from "react";
import { defineConfigSchema, validators } from "@openmrs/esm-module-config";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home.component";

defineConfigSchema("@openmrs/esm-home-app", {
  buttons: {
    enabled: {
      default: true
    },
    list: {
      arrayElements: {
        label: { validators: [validators.isString] },
        link: {
          spa: { validators: [validators.isBoolean] },
          url: { validators: [validators.isString] }
        }
      },
      default: [
        {
          label: "Active Visits",
          link: {
            spa: false,
            url: "/openmrs/coreapps/activeVisits.page?app=coreapps.activeVisits"
          },
          requiredPrivilege: "App: coreapps.activeVisits"
        },
        {
          label: "Patient Registration",
          link: {
            spa: true,
            url: "/patient-registration"
          }
        },
        {
          label: "Capture Vitals",
          link: {
            spa: false,
            url:
              "/openmrs/coreapps/findpatient/findPatient.page?app=referenceapplication.vitals"
          },
          requiredPrivilege: "App: referenceapplication.vitals"
        },
        {
          label: "Appointment Scheduling",
          link: {
            spa: false,
            url: "/openmrs/appointmentschedulingui/home.page"
          },
          requiredPrivilege: "App: appointmentschedulingui.home"
        },
        {
          label: "Reports",
          link: {
            spa: false,
            url: "/openmrs/reportingui/reportsapp/home.page"
          },
          requiredPrivilege: "View Reports"
        },
        {
          label: "Data Management",
          link: {
            spa: false,
            url: "/openmrs/coreapps/datamanagement/dataManagement.page"
          },
          requiredPrivilege: "App: coreapps.dataManagement"
        },
        {
          label: "Configure Metadata",
          link: {
            spa: false,
            url: "/openmrs/adminui/metadata/configureMetadata.page"
          },
          requiredPrivilege: "App: coreapps.configuremetadata"
        },
        {
          label: "System Administration",
          link: {
            spa: false,
            url:
              "/openmrs/coreapps/systemadministration/systemAdministration.page"
          },
          requiredPrivilege: "App: coreapps.systemAdministration"
        }
      ]
    }
  },
  search: {
    patientResultUrl: {
      default:
        "${openmrsBase}/coreapps/clinicianfacing/patient.page?patientId=${patientUuid}",
      devDefault: "${openmrsSpaBase}/patient/${patientUuid}/chart",
      description:
        "Where clicking a patient result takes the user. Accepts template parameter ${patientUuid}",
      validators: [validators.isUrlWithTemplateParameters(["patientUuid"])]
    }
  }
});

function Root(props) {
  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <Route path="/home" component={Home} />
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: "home",
  moduleName: "@openmrs/esm-home-app"
})(Root);
