import { gql, useQuery } from '@apollo/client';
import { ProductPageNameQuery, ProductPageNameQueryVariables } from 'api';
import Page from 'components/Page';
import config from 'config';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ProductScene from 'scenes/ProductScene';
import { withApollo } from 'apollo/withApollo';

export interface ProductPageProps {}

const PRODUCT_PAGE_NAME_QUERY = gql`
  query ProductPageNameQuery($id: ID!) {
    product(id: $id) {
      name
    }
  }
`;

const ProductPage: NextPage<ProductPageProps> = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, loading, error } = useQuery<
    ProductPageNameQuery,
    ProductPageNameQueryVariables
  >(PRODUCT_PAGE_NAME_QUERY, {
    variables: {
      id: id?.toString() ?? '',
    },
  });

  return (
    <Page
      title={`${config.public.storeName} | ${
        loading || error ? 'Carregando...' : data?.product?.name ?? ''
      }`}
    >
      <ProductScene />
    </Page>
  );
};

export default withApollo({ ssr: true })(ProductPage);
