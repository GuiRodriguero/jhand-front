import { useEffect, useCallback, useState } from 'react';
import { HandResultFilters } from '../components/HandResultFilters';
import { HandResultTable } from '../components/HandResultTable';
import { HandResultPagination } from '../components/HandResultPagination';
import type { HandResult, HandResultFiltersValue } from '../types/handResult.types';
import { handsApi } from '../services/handsApi.ts';

export function HandResultView() {
  const [hands, setHands] = useState<HandResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [handId, setHandId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [heroCards, setHeroCards] = useState('');
  const [handRank, setHandRank] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<HandResultFiltersValue>({});

  const fetchHands = useCallback(async (pageNumber: number, filters: HandResultFiltersValue) => {
    setIsLoading(true);
    try {
      const fetchedHands = await handsApi.findAll(pageNumber, 20, filters);
      setHands(fetchedHands?.content || []);
      setTotalPages(fetchedHands?.totalPages || 0);
      setPage(fetchedHands?.number ?? pageNumber);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHands(0, appliedFilters);
  }, [fetchHands, appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters({ handId, sessionId, heroCards, handRank });
  };

  const handleClearFilters = () => {
    setHandId('');
    setSessionId('');
    setHeroCards('');
    setHandRank('');
    setAppliedFilters({});
  };

  const handlePageChange = (nextPage: number) => {
    fetchHands(nextPage, appliedFilters);
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full text-[#99a1af]">
      <HandResultFilters
        handId={handId}
        onHandIdChange={setHandId}
        sessionId={sessionId}
        onSessionIdChange={setSessionId}
        heroCards={heroCards}
        onHeroCardsChange={setHeroCards}
        handRank={handRank}
        onHandRankChange={setHandRank}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <div className="flex-1 min-h-0">
        <HandResultTable hands={hands} isLoading={isLoading} />
      </div>

      <HandResultPagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
}
