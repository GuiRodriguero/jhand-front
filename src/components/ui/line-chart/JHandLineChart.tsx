import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts';
import { cn } from '@/lib/cn';
import { niceDomain } from './lineChartScale';

interface JHandLineChartProps {
  readonly values: readonly number[];
  readonly ariaLabel: string;
  readonly formatValue: (value: number) => string;
  readonly describePoint: (index: number) => string;
  readonly onPointClick?: (index: number) => void;
  readonly className?: string;
}

interface ChartDatum {
  readonly point: number;
  readonly value: number;
}

const HEIGHT = 288;
const AXIS_TICK = { fill: 'var(--color-foreground-muted)', fontSize: 12 };
const SERIES_COLOR = 'var(--color-info)';

export function JHandLineChart({
  values,
  ariaLabel,
  formatValue,
  describePoint,
  onPointClick,
  className,
}: JHandLineChartProps) {
  if (values.length === 0) return null;

  const data: ChartDatum[] = values.map((value, index) => ({ point: index + 1, value }));
  const domain = niceDomain(values);
  const lastPoint = values.length;

  const renderTooltip = ({ active, payload, label }: TooltipContentProps) => {
    if (!active || payload.length === 0) return null;
    return (
      <div className="rounded-lg border border-border bg-surface-dark px-3 py-2 shadow-lg">
        <div className="text-sm font-bold text-foreground-strong tabular-nums">
          {formatValue(Number(payload[0].value))}
        </div>
        <div className="text-xs text-foreground-muted">{describePoint(Number(label) - 1)}</div>
      </div>
    );
  };

  return (
    <div role="group" aria-label={ariaLabel} className={cn(onPointClick && 'cursor-pointer', className)}>
      <ResponsiveContainer width="100%" height={HEIGHT}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
          onClick={(state) => {
            if (onPointClick && state.activeTooltipIndex != null) onPointClick(Number(state.activeTooltipIndex));
          }}
        >
          <CartesianGrid vertical={false} stroke="var(--color-border-subtle)" />
          <XAxis
            dataKey="point"
            type="number"
            domain={[1, lastPoint]}
            allowDecimals={false}
            tick={AXIS_TICK}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[domain.min, domain.max]}
            ticks={[...domain.ticks]}
            tickFormatter={formatValue}
            tick={AXIS_TICK}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <ReferenceLine y={0} stroke="var(--color-border)" />
          <Tooltip
            content={renderTooltip}
            cursor={{ stroke: 'var(--color-foreground-muted)', strokeWidth: 1 }}
            isAnimationActive={false}
          />
          <Line
            dataKey="value"
            type="linear"
            stroke={SERIES_COLOR}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            dot={false}
            activeDot={{ r: 5, fill: SERIES_COLOR, stroke: 'var(--color-surface)', strokeWidth: 2 }}
            isAnimationActive={false}
          />
          <ReferenceDot x={lastPoint} y={values[lastPoint - 1]} r={4} fill={SERIES_COLOR} stroke="none" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
