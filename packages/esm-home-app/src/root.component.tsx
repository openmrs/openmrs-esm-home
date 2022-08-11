import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeDashboard from './dashboard/home-dashboard.component';

const Root: React.FC = () => (
  <BrowserRouter basename={window.spaBase}>
    <main className="omrs-main-content">
      <Routes>
        <Route path="/home" element={<HomeDashboard />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default Root;
