import { ArrowLeft, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { JHandErrorMessage } from '@/components/ui/status/JHandErrorMessage';
import { JHandLoading } from '@/components/ui/status/JHandLoading';
import { isNotFoundError } from '@/lib/axios';
import { cn } from '@/lib/cn';
import { SessionChartCard } from '../components/SessionChartCard';
import { SessionHandHighlight } from '../components/SessionHandHighlight';
import { SessionPositionTable } from '../components/SessionPositionTable';
import { SessionSummary } from '../components/SessionSummary';
import { useSessionHandStatsQuery } from '../hooks/useSessionHandStatsQuery';
import { useSessionQuery } from '../hooks/useSessionQuery';
import { formatDuration, handsPath, handsPerHour, sessionsListPath } from '../utils/sessionDetailUtils';

const LINK_CLASS_NAME = cn(
  'inline-flex items-center gap-2 rounded-lg text-sm text-foreground-muted transition-colors',
  'hover:text-foreground-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
);

export function SessionDetailView() {
  const { t } = useTranslation();
  const { sessionId = '' } = useParams();
  const sessionQuery = useSessionQuery(sessionId);
  const statsQuery = useSessionHandStatsQuery(sessionId);

  if (sessionQuery.isPending) return <JHandLoading />;

  if (sessionQuery.isError) {
    return (
      <div className="flex flex-col gap-6 p-8">
        <Link to="/sessions" className={cn(LINK_CLASS_NAME, 'self-start')}>
          <ArrowLeft size={16} aria-hidden="true" />
          {t('sessions.detail.back')}
        </Link>
        <JHandErrorMessage
          message={isNotFoundError(sessionQuery.error) ? t('sessions.detail.notFound') : t('default.errorResult')}
        />
      </div>
    );
  }

  const session = sessionQuery.data;
  const stats = statsQuery.data;
  const perHour = handsPerHour(session.handCount, session.startTime, session.endTime);

  return (
    <div className="flex flex-col gap-6 p-8 w-full">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <Link to={sessionsListPath(session.type)} className={LINK_CLASS_NAME}>
            <ArrowLeft size={16} aria-hidden="true" />
            {t('sessions.detail.back')}
          </Link>
          <Link to={handsPath(session.type, { sessionId: session.sessionId })} className={LINK_CLASS_NAME}>
            <List size={16} aria-hidden="true" />
            {t('sessions.detail.viewHands')}
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground-strong break-all">{session.sessionId}</h1>
          <span className="rounded-md border border-border bg-surface-dark px-2 py-1 text-xs font-medium">
            {t(`sessionType.${session.type}`)}
          </span>
        </div>
        <p className="text-sm text-foreground-muted">
          {session.startTime ? new Date(session.startTime).toLocaleString() : '-'}
          {' · '}
          {t('sessions.detail.summary', {
            handCount: String(session.handCount ?? 0),
            duration: formatDuration(session.startTime, session.endTime),
          })}
          {perHour != null && ` · ${t('sessions.detail.handsPerHour', { count: perHour })}`}
        </p>
      </header>

      <SessionSummary session={session} stats={stats} />

      {statsQuery.isPending && <JHandLoading />}
      {statsQuery.isError && <JHandErrorMessage message={t('default.errorResult')} />}
      {stats && (
        <>
          <SessionChartCard type={session.type} points={stats.points} />

          <div className="grid gap-4 lg:grid-cols-2">
            <SessionHandHighlight
              title={t('sessions.detail.highlights.best')}
              hand={stats.bestHand}
              type={session.type}
            />
            <SessionHandHighlight
              title={t('sessions.detail.highlights.worst')}
              hand={stats.worstHand}
              type={session.type}
            />
          </div>

          <SessionPositionTable results={stats.byPosition} type={session.type} />
        </>
      )}
    </div>
  );
}
