import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import produce from 'immer';

const CART_STORAGE_KEY = '__cart__';

type CartContextType = {
  items: string[];
  addItem: (item: string, quantity: number) => void;
  removeItem: (item: string, quantity?: number) => void;
  clearItems: () => void;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === CART_STORAGE_KEY && e.newValue !== JSON.stringify(items)) {
        setItems(JSON.parse(e.newValue ?? '[]'));
      }
    }

    window.addEventListener('storage', onStorage);

    return window.removeEventListener('storage', onStorage);
  }, [items]);

  const addItem = useCallback((item: string, quantity: number) => {
    setItems(
      produce(draft => {
        for (let index = 0; index < quantity; index++) {
          draft.push(item);
        }
      }),
    );
  }, []);

  const removeItem = useCallback((item: string, quantity?: number) => {
    setItems(
      produce(draft => {
        if (quantity && quantity >= 1) {
          for (let index = 0; index < quantity; index++) {
            const index = draft.indexOf(item);
            if (index > -1) {
              draft.splice(index, 1);
            }
          }
        } else {
          for (let i = 0; i < draft.length; i++) {
            if (draft[i] === item) {
              draft.splice(i, 1);
              i--;
            }
          }
        }
      }),
    );
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
