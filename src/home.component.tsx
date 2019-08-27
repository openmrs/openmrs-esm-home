import React from "react";
import { match, Route } from "react-router";
import { maybe } from "kremling";
import HomeDashboard from "./dashboard/home-dashboard.component";
import PatientSearch from "./patient-search/patient-search.component";

export default function Home(props: HomeProps) {
  const isPatientSearch = () => {
    return props.match.url.includes("patient-search");
  };

  return (
    <main className={maybe("omrs-main-content", !isPatientSearch)}>
      <Route path={props.match.url} exact component={HomeDashboard} />
      <Route
        path={props.match.url + "/patient-search"}
        component={PatientSearch}
      />
    </main>
  );
}

type HomeProps = {
  match: match;
};
