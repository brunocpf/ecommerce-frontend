import getStaticApolloProps from 'apollo/getStaticApolloProps';
import { withApollo } from 'apollo/withApollo';
import Page from 'components/Page';
import config from 'config';
import { NextPage } from 'next';
import HomeScene from 'scenes/HomeScene';

const HomePage: NextPage = () => {
  return (
    <Page title={config.public.storeName}>
      <HomeScene />
    </Page>
  );
};

export default withApollo({ ssr: false })(HomePage);

export const getStaticProps = getStaticApolloProps<{}, {}>(HomePage, {
  revalidate: 10,
});
