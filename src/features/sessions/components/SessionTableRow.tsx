import type { MouseEvent, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { sessionDetailPath } from '../utils/sessionDetailUtils';

interface SessionTableRowProps {
  readonly sessionId: string;
  readonly children: ReactNode;
}

export function SessionTableRow({ sessionId, children }: SessionTableRowProps) {
  const navigate = useNavigate();
  const path = sessionDetailPath(sessionId);

  const handleClick = (event: MouseEvent<HTMLTableRowElement>) => {
    if (event.target instanceof Element && event.target.closest('a')) return;
    void navigate(path);
  };

  return (
    <tr
      className="border-b border-border-subtle hover:bg-surface-light/50 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <td className="p-4">
        <Link
          to={path}
          title={sessionId}
          className={cn(
            'block max-w-md truncate rounded-sm hover:text-foreground-strong',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
          )}
        >
          {sessionId}
        </Link>
      </td>
      {children}
    </tr>
  );
}
