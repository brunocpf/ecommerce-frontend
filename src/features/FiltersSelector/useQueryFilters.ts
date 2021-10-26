import { useMemo } from 'react';
import { FiltersSelectorOptions } from './FiltersSelector';
import useQueryString from 'util/useQueryString';

const useQueryFilters = () => {
  const queryFilters = useQueryString('filters');

  return useMemo(() => {
    if (typeof queryFilters === 'string') {
      try {
        return JSON.parse(
          decodeURIComponent(queryFilters),
        ) as FiltersSelectorOptions;
      } catch {
        return undefined;
      }
    }
    return undefined;
  }, [queryFilters]);
};

export default useQueryFilters;
