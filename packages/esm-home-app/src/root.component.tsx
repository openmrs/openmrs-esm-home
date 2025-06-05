import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useConfig, useLeftNav } from '@openmrs/esm-framework';
import HomeDashboard from './dashboard/home-dashboard.component';
import { type ConfigSchema } from './config-schema';

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;
  const { leftNavMode } = useConfig<ConfigSchema>();
  useLeftNav({
    name: 'homepage-dashboard-slot',
    basePath: spaBasePath,
    mode: leftNavMode,
  });

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
