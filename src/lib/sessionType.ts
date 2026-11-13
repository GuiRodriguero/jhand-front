export const SESSION_TYPES = ['CASH_GAME', 'TOURNAMENT'] as const;

export type SessionType = (typeof SESSION_TYPES)[number];

export const DEFAULT_SESSION_TYPE: SessionType = 'CASH_GAME';

export const SESSION_TYPE_PARAM = 'type';

function isSessionType(value: string | null): value is SessionType {
  return SESSION_TYPES.some((type) => type === value);
}

export function sessionTypeFromSearchParams(searchParams: URLSearchParams): SessionType {
  const value = searchParams.get(SESSION_TYPE_PARAM);
  return isSessionType(value) ? value : DEFAULT_SESSION_TYPE;
}
