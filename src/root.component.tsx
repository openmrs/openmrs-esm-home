import React from "react";
import { openmrsRootDecorator } from "@openmrs/esm-context";
import { defineConfigSchema, validators, Type } from "@openmrs/esm-config";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home.component";

defineConfigSchema("@openmrs/esm-home-app", {
  buttons: {
    enabled: {
      _type: Type.Boolean,
      _default: true,
      _description:
        "Whether to show big buttons on the home page (including extensions)"
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
      _default: [],
      _description:
        "Custom buttons to add, which will come after the button extensions"
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
