export const queryKeys = {
  hands: {
    all: ['hands'] as const,
    list: (params: object) => ['hands', 'list', params] as const,
  },
  sessions: {
    all: ['sessions'] as const,
    list: (params: object) => ['sessions', 'list', params] as const,
  },
  equity: {
    calculate: (params: object) => ['equity', params] as const,
  },
};
