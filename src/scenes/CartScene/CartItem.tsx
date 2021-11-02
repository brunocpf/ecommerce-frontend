import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { CartItemFragment } from 'api';
import { useCartContext } from 'features/Cart';
import gql from 'graphql-tag';
import Image from 'next/image';
import Link from 'next/link';
import calculatePrice from 'util/calculatePrice';
import currencyFormatter from 'util/currencyFormatter';
import getAbsoluteImageUrl from 'util/getAbsoluteImageUrl';

export interface CartItemProps {
  product: CartItemFragment;
}

const CartItem: ComponentWithFragment<CartItemProps> = ({
  product: { id, name, price, brand, images, discount },
}) => {
  const { items, addItem, removeItem } = useCartContext();
  const finalPrice = calculatePrice(price, discount);
  const itemQuantity = items.filter(q => q === id).length;

  return (
    <div className="relative flex bg-white gap-2 w-full rounded-3xl p-4 shadow border-gray-200">
      <div className="flex items-center justify-center w-36 h-36 relative">
        <Image
          className="pointer-events-none"
          src={getAbsoluteImageUrl(images?.[0]?.url ?? '')}
          alt={images?.[0]?.alternativeText ?? ''}
          layout="fill"
        />
      </div>
      <div className="flex-1">
        <Link
          href={{
            pathname: '/produtos/[id]',
            query: { id },
          }}
          passHref
        >
          <a>
            <div className="text-xs">{brand?.name ?? '-'}</div>
            <p className="text-lg font-bold line-clamp-2">{name}</p>
          </a>
        </Link>
        <div className="w-full mt-4 flex gap-4 items-center text-sm">
          <div>
            <div className="text-xs">Preço</div>
            {currencyFormatter.format(finalPrice)}
          </div>
          <div className="text-lg font-bold text-orange-500">
            <div className="text-xs">Total</div>
            {currencyFormatter.format(finalPrice * itemQuantity)}
          </div>
        </div>
        <div className="select-none font-semibold text-sm rounded-2xl py-2 flex gap-2 items-center">
          <button
            disabled={itemQuantity <= 1}
            className="flex items-center justify-center gap-2 active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity"
            onClick={() => removeItem(id, 1)}
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          {itemQuantity}
          <button
            className="flex items-center justify-center gap-2 active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity"
            onClick={() => addItem(id, 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          <button
            className="text-red-600 flex items-center justify-center gap-2 active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity"
            onClick={() => removeItem(id)}
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.fragment = gql`
  fragment CartItemFragment on Product {
    id
    name
    description
    price
    inStock
    discount
    brand {
      name
      slug
    }
    category {
      name
      slug
    }
    images(limit: 1) {
      caption
      alternativeText
      url
      formats
    }
  }
`;

export default CartItem;
