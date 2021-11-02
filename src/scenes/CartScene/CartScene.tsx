import { useQuery, gql } from '@apollo/client';
import { useCartContext } from 'features/Cart/CartContext';
import { useMemo } from 'react';
import { CartItemsQuery, CartItemsQueryVariables } from 'api';
import Spinner from 'components/Spinner';
import CartItem from './CartItem';
import currencyFormatter from 'util/currencyFormatter';
import Link from 'next/link';
import ActionButton from 'components/ActionButton';
import { useAuthenticationContext } from 'features/Authentication';
import CartCheckout from 'features/CartCheckout';
import Container from 'components/Container';

const CART_ITEMS_QUERY = gql`
  ${CartItem.fragment}

  query CartItemsQuery($ids: [ID!]) {
    products(where: { id_in: $ids, inStock: true }) {
      ...CartItemFragment
    }
  }
`;

export interface CartSceneProps {}

const CartScene: React.FC<CartSceneProps> = () => {
  const { items, clearItems } = useCartContext();
  const ids = useMemo(() => Array.from(new Set(items)), [items]);
  const { loggedIn, authenticating } = useAuthenticationContext();

  const { data, loading, error } = useQuery<
    CartItemsQuery,
    CartItemsQueryVariables
  >(CART_ITEMS_QUERY, {
    variables: {
      ids,
    },
    skip: ids.length <= 0,
  });

  if (loading || error)
    return (
      <div className="flex items-center justify-center w-full p-40">
        <Spinner className="text-black h-40 w-40" />
      </div>
    );

  function calculateTotalPrice() {
    let total = 0;

    if (data?.products) {
      for (const product of data?.products) {
        total +=
          (product?.price ?? 0) * items.filter(q => q === product?.id).length;
      }
    }

    return total;
  }

  return (
    <Container className="my-4 flex flex-col gap-4 md:flex-row">
      <section className="md:flex-1">
        <h6 className="text-lg font-bold">Carrinho</h6>
        {ids.length <= 0 ? (
          <span>Nenhum produto adicionado</span>
        ) : (
          <div className="flex gap-2 flex-col">
            {data?.products?.map(p => p && <CartItem product={p} key={p.id} />)}
          </div>
        )}
        {ids.length > 0 && (
          <ActionButton
            className="mt-4 w-full p-2"
            onClick={() => clearItems()}
            type="reset"
          >
            Limpar Carrinho
          </ActionButton>
        )}
        <p className="text-xs mb-2 mt-2">
          {'>> '}
          <Link href="/produtos" passHref>
            <a className="text-orange-500 font-bold underline">
              Retornar para os produtos
            </a>
          </Link>
        </p>
      </section>
      {ids.length > 0 && (
        <section className="md:flex-1 p-8 bg-white rounded">
          {authenticating ? (
            <Spinner className="h-20 w-20" />
          ) : !loggedIn ? (
            <div className="flex items-center justify-center whitespace-pre-wrap h-full">
              {'Por favor '}
              <Link
                href={{
                  pathname: '/login',
                  query: { redirect: '/carrinho' },
                }}
                passHref
              >
                <a className="text-orange-500 font-bold underline">
                  faça o login
                </a>
              </Link>
              {' para finalizar a compra'}
            </div>
          ) : (
            <div className="flex flex-col">
              <CartCheckout></CartCheckout>

              <p>Total: {currencyFormatter.format(calculateTotalPrice())}</p>
              <Link href="/checkout" passHref>
                <a className="mt-4 p-4 rounded text-lg text-white bg-emerald-500 active:opacity-80 hover:opacity-50 transition-opacity">
                  Comprar
                </a>
              </Link>
            </div>
          )}
        </section>
      )}
    </Container>
  );
};

export default CartScene;
