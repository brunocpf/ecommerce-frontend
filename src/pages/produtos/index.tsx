import Page from 'components/Page';
import SearchScene from 'scenes/SearchScene';
import config from 'config';
import { NextPage } from 'next';
import withApollo from 'util/withApollo';

const SearchPage: NextPage = () => {
  return (
    <Page title={config.public.storeName}>
      <SearchScene />
    </Page>
  );
};

export default withApollo({ ssr: true })(SearchPage);
