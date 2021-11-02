import Page from 'components/Page';
import config from 'config';
import { NextPage } from 'next';
import SearchScene from 'scenes/SearchScene';
import { withApollo } from 'apollo/withApollo';

const SearchPage: NextPage = () => {
  return (
    <Page title={`${config.public.storeName} | Produtos`}>
      <SearchScene />
    </Page>
  );
};

export default withApollo({ ssr: true })(SearchPage);
