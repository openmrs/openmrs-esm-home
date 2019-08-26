import React from "react";
import { match } from "react-router";

export default function PatientSearch(props: PatientSearchProps) {
  return <section>The patient search!</section>;
}

type PatientSearchProps = {
  match: match;
};
