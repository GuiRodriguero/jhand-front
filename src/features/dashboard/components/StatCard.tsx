interface StatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon?: React.ReactNode;
  readonly valueColor?: string;
}

export function StatCard({ title, value, icon, valueColor = 'text-white' }: StatCardProps) {
  return (
    <div className="bg-surface-lighter rounded-lg p-6 flex flex-col gap-2 shadow-md">
      <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <div className={`text-3xl font-bold font-mono ${valueColor}`}>{value}</div>
    </div>
  );
}
