import { useTranslation } from 'react-i18next';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { cn } from '@/lib/cn';
import { slotIndex, type EquitySlots, type SlotId } from '../utils/equitySlots';
import { CardSlotButton } from './CardSlotButton';

interface PlayerHandPanelProps {
  readonly title: string;
  readonly slotIds: readonly SlotId[];
  readonly slots: EquitySlots;
  readonly activeSlot: SlotId | null;
  readonly onSlotClick: (slotId: SlotId) => void;
  readonly equity: number | null;
  readonly isRefreshing: boolean;
  readonly barClassName: string;
}

export function PlayerHandPanel({
  title,
  slotIds,
  slots,
  activeSlot,
  onSlotClick,
  equity,
  isRefreshing,
  barClassName,
}: PlayerHandPanelProps) {
  const { t, i18n } = useTranslation();
  const formattedEquity =
    equity === null
      ? '—'
      : new Intl.NumberFormat(i18n.language, { style: 'percent', maximumFractionDigits: 1 }).format(equity);

  return (
    <JHandCard className="items-center">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">{title}</h2>
      <div className="flex gap-2">
        {slotIds.map((slotId) => (
          <CardSlotButton
            key={slotId}
            card={slots[slotId]}
            isActive={slotId === activeSlot}
            label={t('equityCalculator.slotLabel', { group: title, index: String(slotIndex(slotId) + 1) })}
            onClick={() => onSlotClick(slotId)}
          />
        ))}
      </div>
      <div className={cn('w-full flex flex-col gap-2 transition-opacity', isRefreshing && 'opacity-50')}>
        <p className="text-3xl font-bold font-mono text-center text-foreground-strong" aria-live="polite">
          {formattedEquity}
        </p>
        <div className="h-2 rounded-full bg-surface-light overflow-hidden">
          <div
            className={cn('h-full transition-[width] duration-500', barClassName)}
            style={{ width: `${(equity ?? 0) * 100}%` }}
          />
        </div>
      </div>
    </JHandCard>
  );
}
