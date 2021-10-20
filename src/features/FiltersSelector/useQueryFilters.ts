import { useMemo } from 'react';
import { atob } from 'isomorphic-base64';
import { FiltersSelectorOptions } from './FiltersSelector';
import useQueryString from 'util/useQueryString';

const useQueryFilters = () => {
  const queryFilters = useQueryString('filters');

  return useMemo(() => {
    if (typeof queryFilters === 'string') {
      return JSON.parse(atob(queryFilters)) as FiltersSelectorOptions;
    }
    return undefined;
  }, [queryFilters]);
};

export default useQueryFilters;
