import Page from 'components/Page';
import config from 'config';
import { NextPage } from 'next';
import CartScene from 'scenes/CartScene';
import withApollo from 'util/withApollo';

const CartPage: NextPage = () => {
  return (
    <Page title={config.public.storeName}>
      <CartScene />
    </Page>
  );
};

export default withApollo({ ssr: true })(CartPage);
