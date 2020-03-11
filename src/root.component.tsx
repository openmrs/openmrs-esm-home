import React from "react";
import { defineConfigSchema, validators } from "@openmrs/esm-module-config";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home.component";

defineConfigSchema("@openmrs/esm-home", {
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
          }
        },
        {
          label: "Register Patient",
          link: {
            spa: false,
            url:
              "/openmrs/registrationapp/registerPatient.page?appId=referenceapplication.registrationapp.registerPatient"
          }
        },
        {
          label: "Capture Vitals",
          link: {
            spa: false,
            url:
              "/openmrs/coreapps/findpatient/findPatient.page?app=referenceapplication.vitals"
          }
        },
        {
          label: "Appointment Scheduling",
          link: {
            spa: false,
            url: "/openmrs/appointmentschedulingui/home.page"
          }
        },
        {
          label: "Reports",
          link: {
            spa: false,
            url: "/openmrs/reportingui/reportsapp/home.page"
          }
        },
        {
          label: "Data Management",
          link: {
            spa: false,
            url: "/openmrs/coreapps/datamanagement/dataManagement.page"
          }
        },
        {
          label: "Configure Metadata",
          link: {
            spa: false,
            url: "/openmrs/adminui/metadata/configureMetadata.page"
          }
        },
        {
          label: "System Administration",
          link: {
            spa: false,
            url:
              "/openmrs/coreapps/systemadministration/systemAdministration.page"
          }
        }
      ]
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
  moduleName: "@openmrs/esm-home"
})(Root);
