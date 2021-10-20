import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import Layout from 'features/Layout';
import { NextPage } from 'next';
import '../styles/globals.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
