const config = {
  public: {
    storeName: process.env.NEXT_PUBLIC_STORE_NAME ?? 'Minha Loja',
    graphqlEndpoint:
      process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337/graphql',
    apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:1337',
    phoneNumber: process.env.PHONE_NUMBER ?? '(99) 9999-9999',
    whatsApp: process.env.WHATSAPP ?? '(99) 9999-9999',
  },
};

export default config;
