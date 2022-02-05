import { createReducer, on } from '@ngrx/store';
import { CartItemModel } from 'src/app/models/CartItem.model';
import {
  addCartItem,
  deleteCartItem,
  emptyCartItems,
  fetchCartItems,
} from './cart-items.action';

const initialState: CartItemModel[] = [];

export const cartItemsReducer = createReducer(
  initialState,
  on(fetchCartItems, (state, { cartItems }) => cartItems),
  on(addCartItem, (state, { newCartItem }) => [...state, newCartItem]),
  on(deleteCartItem, (state, { deletedCartItemId }) =>
    state.filter((cartItem) => cartItem._id !== deletedCartItemId)
  ),
  on(emptyCartItems, () => initialState)
);
