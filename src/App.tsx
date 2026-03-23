import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardView } from './features/dashboard/views/DashboardView';
import { MainLayout } from './layouts/MainLayout';
import { SettingsView } from './features/settings/views/SettingsView';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
