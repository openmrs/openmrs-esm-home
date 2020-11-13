import React from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { defineConfigSchema, validators, Type } from "@openmrs/esm-config";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home.component";

defineConfigSchema("@openmrs/esm-home-app", {
  buttons: {
    enabled: {
      _type: Type.Boolean,
      _default: true
    },
    list: {
      _type: Type.Array,
      _elements: {
        label: { _type: Type.String },
        link: {
          _type: Type.String,
          _validators: [validators.isUrl]
        },
        requiredPrivilege: {
          _type: Type.String
        }
      },
      _default: [
        {
          label: "Active Visits",
          link:
            "${openmrsBase}/coreapps/activeVisits.page?app=coreapps.activeVisits",
          requiredPrivilege: "App: coreapps.activeVisits"
        },
        {
          label: "Capture Vitals",
          link:
            "${openmrsBase}/coreapps/findpatient/findPatient.page?app=referenceapplication.vitals",
          requiredPrivilege: "App: referenceapplication.vitals"
        },
        {
          label: "Appointment Scheduling",
          link: "${openmrsBase}/appointmentschedulingui/home.page",
          requiredPrivilege: "App: appointmentschedulingui.home"
        },
        {
          label: "Reports",
          link: "${openmrsBase}/reportingui/reportsapp/home.page",
          requiredPrivilege: "View Reports"
        },
        {
          label: "Data Management",
          link: "${openmrsBase}/coreapps/datamanagement/dataManagement.page",
          requiredPrivilege: "App: coreapps.dataManagement"
        },
        {
          label: "Configure Metadata",
          link: "${openmrsBase}/adminui/metadata/configureMetadata.page",
          requiredPrivilege: "App: coreapps.configuremetadata"
        },
        {
          label: "System Administration",
          link:
            "${openmrsBase}/coreapps/systemadministration/systemAdministration.page",
          requiredPrivilege: "App: coreapps.systemAdministration"
        }
      ]
    }
  },
  search: {
    patientResultUrl: {
      _default:
        "${openmrsBase}/coreapps/clinicianfacing/patient.page?patientId=${patientUuid}",
      _devDefault: "${openmrsSpaBase}/patient/${patientUuid}/chart",
      _description:
        "Where clicking a patient result takes the user. Accepts template parameter ${patientUuid}",
      _validators: [validators.isUrlWithTemplateParameters(["patientUuid"])]
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
