import Page from 'components/Page';
import clientConfig from 'config/clientConfig';

export default function HomePage() {
  return <Page title={clientConfig.storeName}></Page>;
}
