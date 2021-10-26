import { gql, useQuery } from '@apollo/client';
import { ProductPageQuery, ProductPageQueryVariables } from 'api';
import PhotoGallery from 'components/PhotoGallery';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getAbsoluteImageUrl from 'util/getAbsoluteImageUrl';
import currencyFormatter from 'util/currencyFormatter';
import Spinner from 'components/Spinner';
import { ExclamationCircleIcon, StarIcon } from '@heroicons/react/outline';
import { useMemo } from 'react';
import { useCartContext } from 'features/Cart/CartContext';

const PRODUCT_PAGE_QUERY = gql`
  query ProductPageQuery($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      featured
      inStock
      brand {
        slug
        name
      }
      category {
        slug
        name
      }
      images {
        caption
        alternativeText
        url
        formats
      }
    }
  }
`;

export interface ProductSceneProps {}

const ProductScene: React.FC<ProductSceneProps> = () => {
  const {
    push,
    query: { id },
  } = useRouter();
  const { data, loading, error } = useQuery<
    ProductPageQuery,
    ProductPageQueryVariables
  >(PRODUCT_PAGE_QUERY, {
    variables: {
      id: id?.toString() ?? '',
    },
  });
  const { addItem } = useCartContext();

  const categoryFilter = useMemo(() => {
    return encodeURIComponent(
      JSON.stringify({
        categories: {
          [data?.product?.category?.slug ?? '-']: true,
        },
      }),
    );
  }, [data?.product?.category?.slug]);

  const brandFilter = useMemo(() => {
    return encodeURIComponent(
      JSON.stringify({
        brands: {
          [data?.product?.brand?.slug ?? '-']: true,
        },
      }),
    );
  }, [data?.product?.brand?.slug]);

  const addToCart = () => {
    if (data?.product?.id) {
      addItem(data.product.id, 1);

      push('/carrinho');
    }
  };

  if (error)
    return (
      <div className="p-4 flex items-center gap-2 text-red-400">
        <ExclamationCircleIcon className="h-10 w-10" />
        Ocorreu um erro, tente novamente mais tarde.
      </div>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center w-full p-40">
        <Spinner className="text-black h-40 w-40" />
      </div>
    );

  return (
    <>
      <div className="my-4">
        {data?.product?.category && (
          <p className="text-xs mb-2">
            {'>>'} Ver mais{' '}
            <Link
              href={{
                pathname: '/produtos',
                query: { filters: categoryFilter },
              }}
              passHref
            >
              <a className="text-emerald-500 font-bold underline">
                {data?.product?.category?.name}
              </a>
            </Link>
          </p>
        )}

        <div className="h-full flex flex-col md:flex-row md:gap-5 relative pb-64">
          <div className="h-96 w-full sm:w-auto sm:flex-1 relative mb-4">
            {data?.product?.images && (
              <PhotoGallery
                images={data?.product?.images.map(i =>
                  getAbsoluteImageUrl(i?.url ?? ''),
                )}
                showArrowButtons={false}
                showNavDots={true}
                auto
              />
            )}
          </div>
          <div className="md:mt-4 sm:flex-1 md:z-10 bg-white relative">
            <div>
              {data?.product?.brand && (
                <p className="text-sm">
                  <Link
                    href={{
                      pathname: '/produtos',
                      query: { filters: brandFilter },
                    }}
                    passHref
                  >
                    <a className="text-emerald-500 font-bold underline">
                      {data?.product?.brand?.name}
                    </a>
                  </Link>
                </p>
              )}
              <p className="text-2xl font-bold line-clamp-3 mb-8">
                {data?.product?.name}
              </p>

              <div className="hidden md:block my-10">
                <button
                  className={`w-full h-full rounded py-4 text-white text-lg active:opacity-80 hover:opacity-50 transition-opacity ${
                    data?.product?.inStock ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  disabled={!data?.product?.inStock}
                  onClick={addToCart}
                >
                  <span className="font-bold">
                    {data?.product?.inStock
                      ? currencyFormatter.format(data?.product?.price ?? 0)
                      : 'Indisponível'}
                  </span>
                  <span className={`${data?.product?.inStock ? '' : 'hidden'}`}>
                    {' - '}
                    Adicionar ao carrinho
                  </span>
                </button>
              </div>

              <p>{data?.product?.description}</p>
              {data?.product?.featured && (
                <div className="absolute right-4 top-4 flex flex-col items-center text-emerald-500">
                  <StarIcon className="h-6 w-6" />
                  <label className="text-xs">Destaque</label>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden bottom-0 left-0 fixed h-64 w-full bg-gradient-to-t from-white via-white to-transparent grid grid-rows-2 z-10">
          <div className="row-start-2 p-8">
            <button
              className={`w-full h-full rounded text-white active:opacity-80 hover:opacity-50 transition-opacity ${
                data?.product?.inStock ? 'bg-emerald-500' : 'bg-red-500'
              }`}
              disabled={!data?.product?.inStock}
              onClick={addToCart}
            >
              <span className="font-bold">
                {data?.product?.inStock
                  ? currencyFormatter.format(data?.product?.price ?? 0)
                  : 'Indisponível'}
              </span>
              <span className={`${data?.product?.inStock ? '' : 'hidden'}`}>
                {' - '}
                Adicionar ao carrinho
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScene;
