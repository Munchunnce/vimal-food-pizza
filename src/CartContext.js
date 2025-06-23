import { createContext } from 'react';

export const CartContext = createContext({
  cart: { items: {}, totalItems: 0 },
  setCart: () => {},
});