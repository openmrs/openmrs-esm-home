import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setLeftNav, unsetLeftNav, useConfig } from '@openmrs/esm-framework';
import HomeDashboard from './dashboard/home-dashboard.component';
import { type ConfigSchema } from './config-schema';

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;
  const { leftNavMode } = useConfig<ConfigSchema>();
  useEffect(() => {
    setLeftNav({
      name: 'homepage-dashboard-slot',
      basePath: spaBasePath,
      mode: leftNavMode as 'normal' | 'collapsed', // TODO: remove cast when type is core is updated
    });
    return () => unsetLeftNav('homepage-dashboard-slot');
  }, [spaBasePath, leftNavMode]);

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
