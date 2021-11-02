import { useMemo } from 'react';
import useQueryString from 'util/useQueryString';

export type SortType =
  | 'name:asc'
  | 'price:desc'
  | 'price:asc'
  | 'updatedAt:desc';

const useQueryFilters = (): SortType | undefined => {
  const querySort = useQueryString('sort');

  return useMemo(() => {
    if (typeof querySort === 'string') {
      return querySort as SortType;
    }
    return undefined;
  }, [querySort]);
};

export default useQueryFilters;
