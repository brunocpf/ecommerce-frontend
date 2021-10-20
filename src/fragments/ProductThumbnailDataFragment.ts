import { gql } from '@apollo/client';

export default gql`
  fragment ProductThumbnailDataFragment on Product {
    id
    name
    price
    featured
    inStock
    brand {
      name
    }
    images(limit: 1) {
      caption
      alternativeText
      formats
    }
  }
`;
