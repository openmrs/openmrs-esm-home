import React from "react";
import { match, Route } from "react-router-dom";
import HomeDashboard from "./dashboard/home-dashboard.component";
import PatientSearch from "./patient-search/patient-search.component";

export default function Home(props: HomeProps) {
  return (
    <main className="omrs-main-content">
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
  location: any;
};
