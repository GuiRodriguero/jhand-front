import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { JHandLoading } from '@/components/ui/status/JHandLoading';
import { DashboardView } from '@/features/dashboard/views/DashboardView';
import { EquityCalculatorView } from '@/features/equity-calculator/views/EquityCalculatorView';
import { HandResultView } from '@/features/hands/views/HandResultView';
import { PreFlopChartView } from '@/features/pre-flop-chart/views/PreFlopChartView';
import { SessionsView } from '@/features/sessions/views/SessionsView';
import { SettingsView } from '@/features/settings/views/SettingsView';
import { MainLayout } from '@/layouts/MainLayout';

// Lazy so that the chart library (recharts) is only downloaded when a chart page is opened.
const SessionDetailView = lazy(() =>
  import('@/features/sessions/views/SessionDetailView').then((module) => ({ default: module.SessionDetailView })),
);

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/pre-flop-chart" element={<PreFlopChartView />} />
        <Route path="/hand-result" element={<HandResultView />} />
        <Route path="/sessions" element={<SessionsView />} />
        <Route
          path="/sessions/:sessionId"
          element={
            <Suspense fallback={<JHandLoading />}>
              <SessionDetailView />
            </Suspense>
          }
        />
        <Route path="/equity-calculator" element={<EquityCalculatorView />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
