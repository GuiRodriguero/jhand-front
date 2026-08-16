import { useEffect, useCallback, useState } from 'react';
import { HandResultFilters } from '../components/HandResultFilters';
import { HandResultTable } from '../components/HandResultTable';
import type { HandResult } from '../types/handResult.types';
import { handsApi } from '../services/handsApi.ts';

export function HandResultView() {
  const [hands, setHands] = useState<HandResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHands = useCallback(async (pageNumber: number) => {
    setIsLoading(true);
    const fetchedHands = await handsApi.findAll(pageNumber);
    setHands(fetchedHands?.content || []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchHands(0);
  }, [fetchHands]);

  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full text-[#99a1af]">
      <HandResultFilters />

      <div className="flex-1 min-h-0">
        <HandResultTable hands={hands} isLoading={isLoading} />
      </div>
    </div>
  );
}
