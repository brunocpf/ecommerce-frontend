import { gql, useQuery } from '@apollo/client';
import { ProductPageNameQuery } from 'api';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Page from 'components/Page';
import ProductScene from 'scenes/ProductScene';
import withApollo from 'util/withApollo';
import config from 'config';

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
  const { data, loading, error } = useQuery<ProductPageNameQuery>(
    PRODUCT_PAGE_NAME_QUERY,
    {
      variables: {
        id,
      },
    },
  );

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
