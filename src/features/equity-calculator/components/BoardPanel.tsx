import { useTranslation } from 'react-i18next';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { slotIndex, type EquitySlots, type SlotId } from '../utils/equitySlots';
import { CardSlotButton } from './CardSlotButton';

interface BoardPanelProps {
  readonly slots: EquitySlots;
  readonly activeSlot: SlotId | null;
  readonly onSlotClick: (slotId: SlotId) => void;
}

const STREETS = [
  { key: 'flop', slotIds: ['board-0', 'board-1', 'board-2'] },
  { key: 'turn', slotIds: ['board-3'] },
  { key: 'river', slotIds: ['board-4'] },
] as const satisfies readonly { key: string; slotIds: readonly SlotId[] }[];

export function BoardPanel({ slots, activeSlot, onSlotClick }: BoardPanelProps) {
  const { t } = useTranslation();
  const boardTitle = t('equityCalculator.board');

  return (
    <JHandCard className="items-center">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">{boardTitle}</h2>
      <div className="flex gap-4">
        {STREETS.map((street) => (
          <div key={street.key} className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {street.slotIds.map((slotId) => (
                <CardSlotButton
                  key={slotId}
                  card={slots[slotId]}
                  isActive={slotId === activeSlot}
                  label={t('equityCalculator.slotLabel', { group: boardTitle, index: String(slotIndex(slotId) + 1) })}
                  onClick={() => onSlotClick(slotId)}
                />
              ))}
            </div>
            <span className="text-xs uppercase tracking-wider text-foreground-muted">
              {t(`equityCalculator.${street.key}`)}
            </span>
          </div>
        ))}
      </div>
    </JHandCard>
  );
}
