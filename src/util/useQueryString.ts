import { useRouter } from 'next/router';

const useQueryString = (key: string) => {
  const { query, asPath } = useRouter();

  return query[key] ?? new URLSearchParams(asPath.split('?')[1]).get(key);
};

export default useQueryString;
