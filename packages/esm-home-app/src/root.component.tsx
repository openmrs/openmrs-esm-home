import { setLeftNav, unsetLeftNav } from '@openmrs/esm-framework';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeDashboard from './dashboard/home-dashboard.component';

export const spaBasePath = `${window.spaBase}`;

const Root: React.FC = () => {
  useEffect(() => {
    setLeftNav({ name: 'homepage-dashboard-slot', basePath: spaBasePath });
    return () => unsetLeftNav('homepage-dashboard-slot');
  }, []);
  return (
    <BrowserRouter basename={window.spaBase}>
      <main className="omrs-main-content">
        <Routes>
          <Route path="home">
            <Route index element={<HomeDashboard />} />
            <Route path=":view" element={<HomeDashboard />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Root;
