import { StatCard } from '../components/StatCard';

export function DashboardView() {
  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="VPIP %" value="123" />
        <StatCard title="PFR %" value="123" valueColor="text-[#00FF41]" />
        <StatCard title="Total Hands" value="123" />
        <StatCard title="$ Net Profit" value="123" />
      </div>
    </div>
  );
}
