import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardView } from './features/dashboard/views/DashboardView';
import { MainLayout } from './layouts/MainLayout';
import { SettingsView } from './features/settings/views/SettingsView';
import { PreFlopChartView } from './features/pre-flop-chart/views/PreFlopChartView';
import { HandResultView } from './features/hands/views/HandResultView';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/pre-flop-chart" element={<PreFlopChartView />} />
        <Route path="/hand-result" element={<HandResultView />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
