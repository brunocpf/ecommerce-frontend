import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { NextPage } from 'next';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import Layout from 'features/Layout';
import { CartProvider } from 'features/Cart';
import { AuthenticationProvider } from 'features/Authentication';
import withApollo from 'util/withApollo';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthenticationProvider>
      <CartProvider>
        <Layout>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() =>
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
            }
          >
            <Component {...pageProps} />
          </AnimatePresence>
        </Layout>
      </CartProvider>
    </AuthenticationProvider>
  );
};

export default withApollo({ ssr: true })(App as any);
