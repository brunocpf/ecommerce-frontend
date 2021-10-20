import { gql, useQuery } from '@apollo/client';
import { SearchProductsQuery, SearchProductsQueryVariables } from 'api';
import ResponsiveList from 'components/ResponsiveList';
import ProductThumbnail from 'features/ProductThumbnail';
import ProductThumbnailDataFragment from 'fragments/ProductThumbnailDataFragment';
import getAbsoluteImageUrl from 'util/getAbsoluteImageUrl';
import {
  AdjustmentsIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline';
import Spinner from 'components/Spinner';
import FiltersSelector, { useQueryFilters } from 'features/FiltersSelector';
import { useMemo, useState } from 'react';
import SearchBar, { useQuerySearch } from 'features/SearchBar';
import Drawer from 'components/Drawer';

export interface HomeSceneProps {}

const SEARCH_PRODUCTS_QUERY = gql`
  ${ProductThumbnailDataFragment}

  query SearchProductsQuery(
    $search: String = ""
    $brands: [String]
    $categories: [String]
    $inStock: [Boolean] = [true, false]
    $start: Int = 0
  ) {
    searchResults: products(
      where: {
        _or: [{ name_contains: $search }, { description_contains: $search }]
        brand: { slug_in: $brands }
        category: { slug_in: $categories }
        inStock_in: $inStock
      }
      sort: "featured:desc,updatedAt:desc"
      limit: 8
      start: $start
    ) {
      ...ProductThumbnailDataFragment
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

// featuredProducts: products(
//   where: { featured: true, inStock: true }
//   sort: "updatedAt:desc"
//   limit: 4
// ) {
//   ...ProductThumbnailDataFragment
// }
// latestProducts: products(
//   where: { inStock: true }
//   sort: "createdAt:desc"
//   limit: 4
// ) {
//   ...ProductThumbnailDataFragment
// }

const SearchScene: React.FC<HomeSceneProps> = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const queryFilters = useQueryFilters();
  const querySearch = useQuerySearch();
  const startOffset = 0;

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
    },
  });

  if (error)
    return (
      <div className="p-4 flex items-center gap-2 text-red-400">
        <ExclamationCircleIcon className="h-10 w-10" />
        Ocorreu um erro, tente novamente mais tarde.
      </div>
    );

  return (
    <div className="my-4 flex gap-4">
      <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
        <FiltersSelector />
      </Drawer>
      <div className="hidden md:block pr-8 border-r-2 border-gray-200">
        <FiltersSelector />
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
        <section className="mb-4">
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
          {loading ? (
            <div className="w-full flex items-center justify-center py-10">
              <Spinner className="text-black h-20 w-20" />
            </div>
          ) : (
            <ResponsiveList>
              {data?.searchResults?.map(p => (
                <ProductThumbnail
                  key={p?.id}
                  id={p?.id ?? ''}
                  name={p?.name ?? ''}
                  image={{
                    alt: p?.images?.[0]?.alternativeText ?? '',
                    caption: p?.images?.[0]?.caption ?? '',
                    url: getAbsoluteImageUrl(
                      p?.images?.[0]?.formats?.thumbnail?.url ?? '',
                    ),
                  }}
                  price={p?.price ?? 0}
                  featured={p?.featured ?? false}
                  brand={p?.brand?.name ?? ''}
                  inStock={p?.inStock ?? false}
                />
              ))}
            </ResponsiveList>
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchScene;
