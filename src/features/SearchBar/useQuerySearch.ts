import { useMemo } from 'react';
import useQueryString from 'util/useQueryString';

const useQuerySearch = () => {
  const querySearch = useQueryString('search');

  return useMemo(() => {
    if (typeof querySearch === 'string') {
      return { search: decodeURIComponent(querySearch) };
    }
    return undefined;
  }, [querySearch]);
};

export default useQuerySearch;
