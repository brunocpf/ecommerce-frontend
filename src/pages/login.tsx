import config from 'config';
import { NextPage } from 'next';
import Page from 'components/Page';
import LoginScene from 'scenes/LoginScene';

export interface RegisterPageProps {}

const LoginPage: NextPage<RegisterPageProps> = () => {
  return (
    <Page title={`${config.public.storeName} | Login`}>
      <LoginScene />
    </Page>
  );
};

export default LoginPage;
