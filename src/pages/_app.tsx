import { FavoritesProvider } from 'features/favorites';
import { Layout } from 'features/layout';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <FavoritesProvider>
        <Component {...pageProps} />
      </FavoritesProvider>
    </Layout>
  );
};

export default App;
