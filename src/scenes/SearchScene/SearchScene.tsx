import { gql, useQuery } from '@apollo/client';
import { SearchProductsQuery, SearchProductsQueryVariables } from 'api';
import ResponsiveList from 'components/ResponsiveList';
import {
  AdjustmentsIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline';
import Spinner from 'components/Spinner';
import FiltersSelector, { useQueryFilters } from 'features/FiltersSelector';
import { useMemo, useState } from 'react';
import SearchBar, { useQuerySearch } from 'features/SearchBar';
import Drawer from 'components/Drawer';
import useQuerySearchPage from 'features/SearchBar/useQuerySearchPage';
import Link from 'next/link';
import ProductThumbnail from 'features/ProductThumbnail';
import Container from 'components/Container';
import ButtonBase from 'components/ButtonBase';
import useQuerySort from '../../features/SortButton/useQuerySort';
import SortButton from 'features/SortButton';

export interface HomeSceneProps {}

const SEARCH_PRODUCTS_QUERY = gql`
  ${ProductThumbnail.fragment}

  query SearchProductsQuery(
    $search: String = ""
    $brands: [String]
    $categories: [String]
    $inStock: [Boolean] = [true, false]
    $start: Int = 0
    $sort: String = "featured:desc"
  ) {
    searchResults: products(
      where: {
        _or: [{ name_contains: $search }, { description_contains: $search }]
        brand: { slug_in: $brands }
        category: { slug_in: $categories }
        inStock_in: $inStock
      }
      sort: $sort
      limit: 8
      start: $start
    ) {
      ...ProductThumbnailFragment
    }

    count: productsCount(
      where: {
        _or: [{ name_contains: $search }, { description_contains: $search }]
        brand: { slug_in: $brands }
        category: { slug_in: $categories }
        inStock_in: $inStock
      }
    )
  }
`;

const SearchScene: React.FC<HomeSceneProps> = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const queryFilters = useQueryFilters();
  const querySearch = useQuerySearch();
  const queryPage = useQuerySearchPage();
  const querySort = useQuerySort();
  const startOffset = (queryPage - 1) * 8;

  const queryObject = useMemo(() => {
    return {
      filters: queryFilters
        ? encodeURIComponent(JSON.stringify(queryFilters))
        : '',
      search: encodeURIComponent(querySearch?.search ?? ''),
      sort: querySort,
    };
  }, [queryFilters, querySearch?.search, querySort]);

  const categories = useMemo(() => {
    if (!queryFilters?.categories) return undefined;

    const checkedCategories = Object.entries(queryFilters.categories)
      .filter(([, value]) => value)
      .map(([key]) => key);

    return checkedCategories.length <= 0 ? undefined : checkedCategories;
  }, [queryFilters]);

  const brands = useMemo(() => {
    if (!queryFilters?.brands || Object.keys(queryFilters.brands).length <= 0)
      return undefined;

    const checkedBrands = Object.entries(queryFilters.brands)
      .filter(([, value]) => value)
      .map(([key]) => key);

    return checkedBrands.length <= 0 ? undefined : checkedBrands;
  }, [queryFilters]);

  const { data, loading, error } = useQuery<
    SearchProductsQuery,
    SearchProductsQueryVariables
  >(SEARCH_PRODUCTS_QUERY, {
    variables: {
      search: querySearch?.search,
      brands,
      categories,
      inStock: queryFilters?.showOutOfStockItems ? [true, false] : [true],
      start: startOffset,
      sort: `featured:desc,${querySort ? querySort : 'updatedAt:desc'}`,
    },
  });

  const lastPage = Math.ceil((data?.count ?? 1) / 8);

  if (error)
    return (
      <div className="p-4 flex items-center gap-2 text-red-400">
        <ExclamationCircleIcon className="h-10 w-10" />
        Ocorreu um erro, tente novamente mais tarde.
      </div>
    );

  return (
    <Container className="my-4 flex gap-4">
      <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
        <FiltersSelector
          onClickClear={() => setDrawerIsOpen(false)}
          onClickFilter={() => setDrawerIsOpen(false)}
        />
      </Drawer>
      <div className="hidden md:block">
        <div className="p-4 bg-white rounded shadow">
          <FiltersSelector />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-5">
          <button
            className="hover:opacity-50 active:opacity-80 transition-opacity md:hidden"
            onClick={() => setDrawerIsOpen(true)}
          >
            <AdjustmentsIcon className="h-6 w-6" />
          </button>
          <SearchBar />
        </div>
        <div className="mb-5 w-full flex">
          <SortButton />
        </div>
        <section className="mb-4">
          {loading ? (
            <div className="w-full flex items-center justify-center py-10">
              <Spinner className="text-black h-20 w-20" />
            </div>
          ) : (
            <>
              {querySearch?.search && (
                <div className="text-xs italic text-gray-500 mb-2">
                  {`Exibindo produtos contendo "${querySearch.search}"`}
                </div>
              )}
              <h1 className="text-bold text-xl select-none mb-1 text-center sm:text-left">
                Resultados
                {data?.searchResults?.length == 0 ? (
                  <div className="text-xs text-gray-500">
                    Nenhum produto encontrado
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">
                    Mostrando {startOffset + 1} -{' '}
                    {startOffset + (data?.searchResults?.length ?? 0)} de{' '}
                    {data?.count}
                  </div>
                )}
              </h1>
              <ResponsiveList>
                {data?.searchResults?.map(
                  p => p && <ProductThumbnail key={p?.id} product={p} />,
                )}
              </ResponsiveList>
              <div className="mt-4 w-full flex justify-center items-center select-none">
                <Link
                  href={{
                    pathname: '/produtos',
                    query: {
                      ...queryObject,
                      page: 1,
                    },
                  }}
                  passHref
                  scroll={false}
                >
                  <ButtonBase
                    className={`text-orange-500 ${
                      queryPage <= 1 ? 'pointer-events-none opacity-40' : ''
                    }`}
                  >
                    <ChevronDoubleLeftIcon className="h-8 w-8" />
                  </ButtonBase>
                </Link>
                <Link
                  href={{
                    pathname: '/produtos',
                    query: {
                      ...queryObject,
                      page: Math.max(queryPage - 1, 1),
                    },
                  }}
                  passHref
                  scroll={false}
                >
                  <ButtonBase
                    className={`text-orange-500 ${
                      queryPage <= 1 ? 'pointer-events-none opacity-40' : ''
                    }`}
                  >
                    <ChevronLeftIcon className="h-8 w-8" />
                  </ButtonBase>
                </Link>
                Página {queryPage}
                <Link
                  href={{
                    pathname: '/produtos',
                    query: {
                      ...queryObject,
                      page: Math.min(queryPage + 1, lastPage),
                    },
                  }}
                  passHref
                  scroll={false}
                >
                  <ButtonBase
                    component="a"
                    className={`text-orange-500 ${
                      queryPage >= lastPage
                        ? 'pointer-events-none opacity-40'
                        : ''
                    }`}
                  >
                    <ChevronRightIcon className="h-8 w-8" />
                  </ButtonBase>
                </Link>
                <Link
                  href={{
                    pathname: '/produtos',
                    query: {
                      ...queryObject,
                      page: lastPage,
                    },
                  }}
                  passHref
                  scroll={false}
                >
                  <ButtonBase
                    className={`text-orange-500 ${
                      queryPage >= lastPage
                        ? 'pointer-events-none opacity-40'
                        : ''
                    }`}
                  >
                    <ChevronDoubleRightIcon className="h-8 w-8" />
                  </ButtonBase>
                </Link>
              </div>
            </>
          )}
        </section>
      </div>
    </Container>
  );
};

export default SearchScene;
