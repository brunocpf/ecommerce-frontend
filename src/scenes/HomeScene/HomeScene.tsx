import { useQuery } from '@apollo/client';
import { HomePageQuery } from 'api';
import ActionButton from 'components/ActionButton';
import Container from 'components/Container';
import ResponsiveList from 'components/ResponsiveList';
import Spinner from 'components/Spinner';
import HeroCarousel from 'features/HeroCarousel';
import ProductThumbnail from 'features/ProductThumbnail';
import SearchBar from 'features/SearchBar';
import gql from 'graphql-tag';
import Link from 'next/link';

const HOME_PAGE_QUERY = gql`
  ${ProductThumbnail.fragment}

  query HomePageQuery {
    featuredProducts: products(
      where: { featured: true, inStock: true }
      sort: "updatedAt:desc"
      limit: 4
    ) {
      ...ProductThumbnailFragment
    }
    latestProducts: products(
      where: { inStock: true }
      sort: "createdAt:desc"
      limit: 4
    ) {
      ...ProductThumbnailFragment
    }
    deals: products(
      where: { featured: true, inStock: true, discount_gt: 0 }
      sort: "discount:desc"
      limit: 4
    ) {
      ...ProductThumbnailFragment
    }
    categories(limit: 4) {
      name
      slug
    }
  }
`;

export interface HomeSceneProps {}

const HomeScene: React.FC<HomeSceneProps> = () => {
  const { data, loading } = useQuery<HomePageQuery>(HOME_PAGE_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Container className="py-4">
      <div className="flex flex-col gap-4">
        <Container className="bg-white h-96 overflow-hidden py-4 rounded-md shadow relative flex justify-between flex-col z-0">
          <HeroCarousel
            title="Melhores preços de"
            promos={[
              {
                image: '/bike-parts.png',
                subtitle: 'peças de bicicleta',
              },
              {
                image: '/electronics.png',
                subtitle: 'eletrônicos',
              },
              {
                image: '/phone-accessories.png',
                subtitle: 'acessórios de celular',
              },
            ]}
          />
          <div className="mt-4">
            <Link href="/produtos" passHref>
              <ActionButton className="text-sm" variant="primary" component="a">
                Ver Produtos
              </ActionButton>
            </Link>
          </div>
        </Container>
        <Container className=" bg-white shadow py-4 w-max rounded-3xl flex flex-col md:flex-row items-center justify-center font-bold text-sm">
          {data?.categories?.map((c, i) => (
            <div key={c?.slug} className="flex">
              {i !== 0 && (
                <span className="hidden md:inline-block whitespace-pre">
                  {' • '}
                </span>
              )}
              <Link
                href={{
                  pathname: '/produtos',
                  query: {
                    filters: JSON.stringify({
                      categories: {
                        [c?.slug ?? '-']: true,
                      },
                    }),
                  },
                }}
                passHref
              >
                <a>{c?.name}</a>
              </Link>
            </div>
          ))}
        </Container>
      </div>
      <div className="my-4 w-full md:hidden">
        <SearchBar />
      </div>
      <div>
        <div className="my-4">
          <div className="flex gap-2 items-center mb-3">
            <h1 className="text-lg font-bold">Lançamentos</h1>
            <Link href="/produtos" passHref>
              <ActionButton
                className="text-xs"
                variant="secondary"
                component="a"
              >
                Ver mais
              </ActionButton>
            </Link>
          </div>
          {data == null && loading ? (
            <Spinner className="w-20 h-20" />
          ) : (
            <ResponsiveList>
              {data?.latestProducts?.map(
                product =>
                  product && (
                    <ProductThumbnail key={product.id} product={product} />
                  ),
              )}
            </ResponsiveList>
          )}
        </div>
        {data?.featuredProducts && data.featuredProducts.length > 0 ? (
          <div className="my-4">
            <div className="flex gap-2 items-center mb-3">
              <h1 className="text-lg font-bold">Produtos em destaque</h1>
              <Link href="/produtos" passHref>
                <ActionButton
                  className="text-xs"
                  variant="secondary"
                  component="a"
                >
                  Ver mais
                </ActionButton>
              </Link>
            </div>
            {data == null && loading ? (
              <Spinner className="w-20 h-20" />
            ) : (
              <ResponsiveList>
                {data.featuredProducts?.map(
                  product =>
                    product && (
                      <ProductThumbnail key={product.id} product={product} />
                    ),
                )}
              </ResponsiveList>
            )}
          </div>
        ) : null}
        {data?.deals && data.deals.length > 0 ? (
          <div className="my-4">
            <h1 className="text-lg font-bold mb-3">Descontos imperdíveis</h1>
            {data == null && loading ? (
              <Spinner className="w-20 h-20" />
            ) : (
              <ResponsiveList>
                {data.deals?.map(
                  product =>
                    product && (
                      <ProductThumbnail key={product.id} product={product} />
                    ),
                )}
              </ResponsiveList>
            )}
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default HomeScene;
