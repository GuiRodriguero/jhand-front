import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { JHandLineChart } from '@/components/ui/line-chart/JHandLineChart';
import { JHandSegmentedControl } from '@/components/ui/segmented-control/JHandSegmentedControl';
import type { SessionType } from '@/lib/sessionType';
import type { SessionChartPoint } from '../types/sessionHandStats.types';
import {
  chartValues,
  formatBigBlinds,
  formatHandAmount,
  handsPath,
  type SessionChartUnit,
} from '../utils/sessionDetailUtils';

interface SessionChartCardProps {
  readonly type: SessionType;
  readonly points: readonly SessionChartPoint[];
}

export function SessionChartCard({ type, points }: SessionChartCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [unit, setUnit] = useState<SessionChartUnit>('AMOUNT');

  const isCash = type === 'CASH_GAME';
  const title = isCash ? t('sessions.detail.chart.cashTitle') : t('sessions.detail.chart.tournamentTitle');
  const unitOptions = [
    {
      value: 'AMOUNT',
      label: isCash ? t('sessions.detail.chart.dollars') : t('sessions.detail.chart.chips'),
    },
    { value: 'BIG_BLINDS', label: t('sessions.detail.chart.bigBlinds') },
  ] as const;

  const formatValue = (value: number) =>
    unit === 'AMOUNT' ? formatHandAmount(value, type, isCash) : formatBigBlinds(value, isCash);

  const describePoint = (index: number) =>
    t('sessions.detail.chart.pointLabel', {
      index: String(index + 1),
      time: new Date(points[index].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

  return (
    <JHandCard>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground-strong">{title}</h2>
        <JHandSegmentedControl
          options={unitOptions}
          value={unit}
          onChange={setUnit}
          ariaLabel={t('sessions.detail.chart.unitLabel')}
        />
      </div>
      <JHandLineChart
        values={chartValues(points, type, unit)}
        ariaLabel={t('sessions.detail.chart.ariaLabel', { title, count: points.length })}
        formatValue={formatValue}
        describePoint={describePoint}
        onPointClick={(index) => void navigate(handsPath(type, { handId: points[index].handId }))}
      />
    </JHandCard>
  );
}
