import Page from 'components/Page';
import config from 'config';
import { NextPage } from 'next';
import HomeScene from 'scenes/HomeScene';
import withApollo from 'util/withApollo';

const Checkout: NextPage = () => {
  return (
    <Page title={`${config.public.storeName} | Carrinho`}>
      <HomeScene />
    </Page>
  );
};

export default withApollo({ ssr: true })(Checkout);
