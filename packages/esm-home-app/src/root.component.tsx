import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeDashboard from './dashboard/home-dashboard.component';

interface RootProps {
  canSearch: boolean;
}

const Root: React.FC<RootProps> = ({ canSearch = true }) => (
  <BrowserRouter basename={window.spaBase}>
    <main className="omrs-main-content">
      <Routes>
        <Route path="/home" element={<HomeDashboard canSearch={canSearch} />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default Root;
