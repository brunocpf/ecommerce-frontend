import { useMemo } from 'react';
import useQueryString from 'util/useQueryString';

const useQuerySearchPage = () => {
  const queryPageNumber = useQueryString('page');

  return useMemo(() => {
    if (typeof queryPageNumber === 'string') {
      return Math.max(1, parseInt(queryPageNumber));
    }
    return 1;
  }, [queryPageNumber]);
};

export default useQuerySearchPage;
