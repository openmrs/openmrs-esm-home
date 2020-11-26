import React from "react";
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
        },
        spa: {
          _type: Type.Boolean,
          _default: false
        }
      },
      _default: [],
      _description:
        "Custom buttons to add, which will come after the button extensions"
    }
  },
  search: {
    patientResultUrl: {
      _default: "${openmrsSpaBase}/patient/${patientUuid}/chart",
      _description:
        "Where clicking a patient result takes the user. Accepts template parameter ${patientUuid}",
      _validators: [validators.isUrlWithTemplateParameters(["patientUuid"])]
    }
  }
});

export default function Root() {
  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <Route path="/home" component={Home} />
    </BrowserRouter>
  );
}
