export const queryKeys = {
  hands: {
    all: ['hands'] as const,
    list: (params: object) => ['hands', 'list', params] as const,
  },
  sessions: {
    all: ['sessions'] as const,
    list: <T extends object>(params: T) => ['sessions', 'list', params] as const,
  },
  equity: {
    calculate: (params: object) => ['equity', params] as const,
  },
};
