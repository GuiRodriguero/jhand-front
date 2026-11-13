import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { importApi } from '../services/importApi';

interface ImportBatchVariables {
  readonly files: File[];
  readonly heroName: string;
}

export function useImportBatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ files, heroName }: ImportBatchVariables) => importApi.importBatch(files, heroName),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.hands.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all }),
      ]),
  });
}
