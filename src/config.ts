const config = {
  public: {
    storeName: process.env.NEXT_PUBLIC_STORE_NAME ?? 'Minha Loja',
    graphqlEndpoint:
      process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:1337/graphql',
    apiUrl: process.env.API_URL ?? 'http://localhost:1337',
  },
};

export default config;
