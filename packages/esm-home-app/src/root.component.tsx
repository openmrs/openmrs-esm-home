import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { setLeftNav, unsetLeftNav } from '@openmrs/esm-framework';
import HomeDashboard from './dashboard/home-dashboard.component';

function FilteredDashboard() {
  const { dashboard } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const knownDashboards = ['appointments', 'service-queues', 'patient-lists'];

    if (!knownDashboards.includes(dashboard)) {
      navigate('/home');
    }
  }, [dashboard, navigate]);

  return <HomeDashboard />;
}

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;

  useEffect(() => {
    setLeftNav({ name: 'homepage-dashboard-slot', basePath: spaBasePath });
    return () => unsetLeftNav('homepage-dashboard-slot');
  }, [spaBasePath]);

  return (
    <BrowserRouter basename={window.spaBase}>
      <main className="omrs-main-content">
        <Routes>
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="/home/:dashboard/*" element={<FilteredDashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Root;
