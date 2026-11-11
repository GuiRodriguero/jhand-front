import { DollarSign, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandSegmentedControl } from '@/components/ui/segmented-control/JHandSegmentedControl';
import type { SessionType } from '@/lib/sessionType';

interface SessionTypeTabsProps {
  readonly value: SessionType;
  readonly onChange: (value: SessionType) => void;
}

export function SessionTypeTabs({ value, onChange }: SessionTypeTabsProps) {
  const { t } = useTranslation();

  return (
    <JHandSegmentedControl
      ariaLabel={t('sessionType.label')}
      value={value}
      onChange={onChange}
      options={[
        { value: 'CASH_GAME', label: t('sessionType.CASH_GAME'), icon: DollarSign },
        { value: 'TOURNAMENT', label: t('sessionType.TOURNAMENT'), icon: Trophy },
      ]}
    />
  );
}
