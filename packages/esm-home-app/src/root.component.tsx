import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import HomeDashboard from './dashboard/home-dashboard.component';
import PatientSearch from './patient-search/patient-search.component';

interface RootProps {
  canSearch: boolean;
}

const Root: React.FC<RootProps> = ({ canSearch = true }) => (
  <BrowserRouter basename={window.spaBase}>
    <main className="omrs-main-content">
      <Route path="/home" exact component={(props) => <HomeDashboard canSearch={canSearch} {...props} />} />
      {canSearch ? (
        <Route path="/home/patient-search" component={PatientSearch} />
      ) : (
        <Redirect from="/home/patient-search" to="/home" />
      )}
    </main>
  </BrowserRouter>
);

export default Root;
