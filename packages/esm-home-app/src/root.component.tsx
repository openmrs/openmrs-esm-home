import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setLeftNav, unsetLeftNav } from '@openmrs/esm-framework';
import HomeDashboard from './dashboard/home-dashboard.component';

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;

  useEffect(() => {
    setLeftNav({ name: 'homepage-dashboard-slot', basePath: spaBasePath });
    return () => unsetLeftNav('homepage-dashboard-slot');
  }, [spaBasePath]);

  return (
    <>
      <main className="omrs-main-content">
        <BrowserRouter basename={window.spaBase}>
          <Routes>
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/home/:dashboard/*" element={<HomeDashboard />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
};

export default Root;
