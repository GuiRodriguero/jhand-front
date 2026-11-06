import { Route, Routes } from 'react-router-dom';
import { DashboardView } from '@/features/dashboard/views/DashboardView';
import { EquityCalculatorView } from '@/features/equity-calculator/views/EquityCalculatorView';
import { HandResultView } from '@/features/hands/views/HandResultView';
import { PreFlopChartView } from '@/features/pre-flop-chart/views/PreFlopChartView';
import { SettingsView } from '@/features/settings/views/SettingsView';
import { MainLayout } from '@/layouts/MainLayout';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/pre-flop-chart" element={<PreFlopChartView />} />
        <Route path="/hand-result" element={<HandResultView />} />
        <Route path="/equity-calculator" element={<EquityCalculatorView />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
