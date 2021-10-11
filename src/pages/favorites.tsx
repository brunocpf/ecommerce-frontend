import Page from 'components/Page';
import React from 'react';
import FavoritesScene from 'scenes/FavoritesScene';

export interface FavoritesPageProps {}

const FavoritesPage: React.FC<FavoritesPageProps> = () => {
  return (
    <Page title="Favoritos">
      <FavoritesScene />
    </Page>
  );
};

export default FavoritesPage;
