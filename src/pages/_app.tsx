import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { NextPage } from 'next';
import '../styles/globals.css';
import { CartProvider } from 'features/Cart';
import { AuthenticationProvider } from 'features/Authentication';
import PageLayout from 'features/PageLayout';
import { HeaderLinkProvider } from 'features/HeaderLinks';
import { withApollo } from 'apollo/withApollo';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <HeaderLinkProvider>
      <AuthenticationProvider>
        <CartProvider>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </CartProvider>
      </AuthenticationProvider>
    </HeaderLinkProvider>
  );
};

export default withApollo({ ssr: true })(App as NextPage);
