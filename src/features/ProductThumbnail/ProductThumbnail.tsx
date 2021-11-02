import Image from 'next/image';
import Link from 'next/link';
import currencyFormatter from 'util/currencyFormatter';
import gql from 'graphql-tag';
import Container from 'components/Container';
import ActionButton from 'components/ActionButton';
import calculatePrice from 'util/calculatePrice';
import { ProductThumbnailFragment } from 'api';
import getAbsoluteImageUrl from 'util/getAbsoluteImageUrl';
import { StarIcon } from '@heroicons/react/outline';
import { useCartContext } from 'features/Cart';
import { useRouter } from 'next/router';

export interface ProductThumbnailProps {
  product: ProductThumbnailFragment;
}

const ProductThumbnail: ComponentWithFragment<ProductThumbnailProps> = ({
  product: {
    id,
    name,
    price,
    brand,
    images,
    inStock,
    createdAt,
    discount,
    featured,
  },
}) => {
  const { addItem } = useCartContext();
  const finalPrice = calculatePrice(price, discount);
  const originalFormattedPrice = currencyFormatter.format(price);
  const formattedPrice = currencyFormatter.format(finalPrice);
  const { push } = useRouter();

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const isNew = new Date(createdAt) >= lastWeek;
  const image = images?.[0];

  const addToCart = () => {
    addItem(id, 1);
    push('/carrinho');
  };

  return (
    <Container className="bg-white py-4 shadow rounded-md flex flex-col">
      <div className="h-9 flex justify-between">
        {discount && (
          <div className="rounded-3xl bg-indigo-800 text-white text-sm p-2 w-max">{`-${
            discount * 100
          }%`}</div>
        )}
        {isNew && (
          <div className="rounded-3xl ring ring-orange-500 text-orange-500 font-bold text-sm p-2 w-max">
            NOVO
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-full relative">
        <Link
          href={{
            pathname: '/produtos/[id]',
            query: { id },
          }}
        >
          <a className="w-36 h-36 relative mb-4">
            <Image
              className="pointer-events-none"
              src={getAbsoluteImageUrl(image?.formats?.thumbnail?.url ?? '')}
              alt={image?.alternativeText ?? ''}
              layout="fill"
            />
          </a>
        </Link>
        {featured && (
          <div className="absolute -right-2 -top-2 flex flex-col items-center text-orange-500">
            <StarIcon className="h-6 w-6" />
          </div>
        )}
      </div>
      <Link
        href={{
          pathname: '/produtos/[id]',
          query: { id },
        }}
      >
        <a className="flex justify-center items-center flex-col" title={name}>
          <div className="text-xs">{brand?.name ?? '-'}</div>
          <p className="text-lg font-bold line-clamp-1">{name}</p>
        </a>
      </Link>
      <div className="flex items-center justify-center flex-col font-bold py-4">
        <div className="text-orange-500 text-2xl">{formattedPrice}</div>

        <div className="text-indigo-900 line-through text-md h-6">
          {discount ? originalFormattedPrice : ' '}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ActionButton
          variant={inStock ? 'primary' : 'error'}
          className="text-sm disabled:opacity-100"
          disabled={!inStock}
          onClick={addToCart}
        >
          {inStock ? 'Adicionar ao carrinho' : 'Indisponível'}
        </ActionButton>
      </div>
    </Container>
  );
};

ProductThumbnail.fragment = gql`
  fragment ProductThumbnailFragment on Product {
    id
    name
    price
    inStock
    discount
    createdAt
    featured
    brand {
      name
      slug
    }
    images(limit: 1) {
      caption
      alternativeText
      formats
    }
  }
`;

export default ProductThumbnail;
