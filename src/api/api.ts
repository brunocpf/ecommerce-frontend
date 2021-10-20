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
  featured: boolean | null;
  inStock: boolean;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
