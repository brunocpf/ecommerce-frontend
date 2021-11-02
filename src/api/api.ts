/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_user {
  __typename: "UsersPermissionsUser";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MeQuery_me {
  __typename: "UsersPermissionsMe";
  user: MeQuery_me_user | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FilterOptionsQuery
// ====================================================

export interface FilterOptionsQuery_categories {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface FilterOptionsQuery_brands {
  __typename: "Brand";
  slug: string;
  name: string | null;
}

export interface FilterOptionsQuery {
  categories: (FilterOptionsQuery_categories | null)[] | null;
  brands: (FilterOptionsQuery_brands | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUser
// ====================================================

export interface LoginUser_login_user_user {
  __typename: "UsersPermissionsUser";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginUser_login_user {
  __typename: "UsersPermissionsMe";
  user: LoginUser_login_user_user | null;
}

export interface LoginUser_login {
  __typename: "UsersPermissionsLoginPayload";
  jwt: string | null;
  user: LoginUser_login_user;
}

export interface LoginUser {
  login: LoginUser_login;
}

export interface LoginUserVariables {
  identifier: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPageNameQuery
// ====================================================

export interface ProductPageNameQuery_product {
  __typename: "Product";
  name: string;
}

export interface ProductPageNameQuery {
  product: ProductPageNameQuery_product | null;
}

export interface ProductPageNameQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CartItemsQuery
// ====================================================

export interface CartItemsQuery_products_brand {
  __typename: "Brand";
  name: string | null;
  slug: string;
}

export interface CartItemsQuery_products_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface CartItemsQuery_products_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  url: string;
  formats: any | null;
}

export interface CartItemsQuery_products {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  price: number;
  inStock: boolean;
  discount: number | null;
  brand: CartItemsQuery_products_brand | null;
  category: CartItemsQuery_products_category | null;
  images: (CartItemsQuery_products_images | null)[] | null;
}

export interface CartItemsQuery {
  products: (CartItemsQuery_products | null)[] | null;
}

export interface CartItemsQueryVariables {
  ids?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePageQuery
// ====================================================

export interface HomePageQuery_featuredProducts_brand {
  __typename: "Brand";
  name: string | null;
  slug: string;
}

export interface HomePageQuery_featuredProducts_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  formats: any | null;
}

export interface HomePageQuery_featuredProducts {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  discount: number | null;
  createdAt: any;
  featured: boolean | null;
  brand: HomePageQuery_featuredProducts_brand | null;
  images: (HomePageQuery_featuredProducts_images | null)[] | null;
}

export interface HomePageQuery_latestProducts_brand {
  __typename: "Brand";
  name: string | null;
  slug: string;
}

export interface HomePageQuery_latestProducts_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  formats: any | null;
}

export interface HomePageQuery_latestProducts {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  discount: number | null;
  createdAt: any;
  featured: boolean | null;
  brand: HomePageQuery_latestProducts_brand | null;
  images: (HomePageQuery_latestProducts_images | null)[] | null;
}

export interface HomePageQuery_deals_brand {
  __typename: "Brand";
  name: string | null;
  slug: string;
}

export interface HomePageQuery_deals_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  formats: any | null;
}

export interface HomePageQuery_deals {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  discount: number | null;
  createdAt: any;
  featured: boolean | null;
  brand: HomePageQuery_deals_brand | null;
  images: (HomePageQuery_deals_images | null)[] | null;
}

export interface HomePageQuery_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface HomePageQuery {
  featuredProducts: (HomePageQuery_featuredProducts | null)[] | null;
  latestProducts: (HomePageQuery_latestProducts | null)[] | null;
  deals: (HomePageQuery_deals | null)[] | null;
  categories: (HomePageQuery_categories | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPageQuery
// ====================================================

export interface ProductPageQuery_product_brand {
  __typename: "Brand";
  slug: string;
  name: string | null;
}

export interface ProductPageQuery_product_category {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface ProductPageQuery_product_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  url: string;
  formats: any | null;
}

export interface ProductPageQuery_product {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  price: number;
  featured: boolean | null;
  inStock: boolean;
  brand: ProductPageQuery_product_brand | null;
  category: ProductPageQuery_product_category | null;
  images: (ProductPageQuery_product_images | null)[] | null;
}

export interface ProductPageQuery {
  product: ProductPageQuery_product | null;
}

export interface ProductPageQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchProductsQuery
// ====================================================

export interface SearchProductsQuery_searchResults_brand {
  __typename: "Brand";
  name: string | null;
  slug: string;
}

export interface SearchProductsQuery_searchResults_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  formats: any | null;
}

export interface SearchProductsQuery_searchResults {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  discount: number | null;
  createdAt: any;
  featured: boolean | null;
  brand: SearchProductsQuery_searchResults_brand | null;
  images: (SearchProductsQuery_searchResults_images | null)[] | null;
}

export interface SearchProductsQuery {
  searchResults: (SearchProductsQuery_searchResults | null)[] | null;
  count: number;
}

export interface SearchProductsQueryVariables {
  search?: string | null;
  brands?: (string | null)[] | null;
  categories?: (string | null)[] | null;
  inStock?: (boolean | null)[] | null;
  start?: number | null;
  sort?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductThumbnailFragment
// ====================================================

export interface ProductThumbnailFragment_brand {
  __typename: "Brand";
  name: string | null;
  slug: string;
}

export interface ProductThumbnailFragment_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  formats: any | null;
}

export interface ProductThumbnailFragment {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  discount: number | null;
  createdAt: any;
  featured: boolean | null;
  brand: ProductThumbnailFragment_brand | null;
  images: (ProductThumbnailFragment_images | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductThumbnailDataFragment
// ====================================================

export interface ProductThumbnailDataFragment_brand {
  __typename: "Brand";
  name: string | null;
  slug: string;
}

export interface ProductThumbnailDataFragment_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  formats: any | null;
}

export interface ProductThumbnailDataFragment {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  featured: boolean | null;
  inStock: boolean;
  brand: ProductThumbnailDataFragment_brand | null;
  images: (ProductThumbnailDataFragment_images | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CartItemFragment
// ====================================================

export interface CartItemFragment_brand {
  __typename: "Brand";
  name: string | null;
  slug: string;
}

export interface CartItemFragment_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface CartItemFragment_images {
  __typename: "UploadFile";
  caption: string | null;
  alternativeText: string | null;
  url: string;
  formats: any | null;
}

export interface CartItemFragment {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  price: number;
  inStock: boolean;
  discount: number | null;
  brand: CartItemFragment_brand | null;
  category: CartItemFragment_category | null;
  images: (CartItemFragment_images | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
