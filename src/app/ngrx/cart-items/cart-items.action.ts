import { createAction, props } from '@ngrx/store';
import { CartItemModel } from 'src/app/models/CartItem.model';

export const fetchCartItems = createAction(
  '[Carts Component] Fetch Cart Items',
  props<{ cartItems: CartItemModel[] }>()
);

export const addCartItem = createAction(
  '[Carts Component] Add Cart Item',
  props<{ newCartItem: CartItemModel }>()
);

export const deleteCartItem = createAction(
  '[Carts Component] Delete Cart Item',
  props<{ deletedCartItemId: string }>()
);

export const emptyCartItems = createAction(
  '[Carts Component] Empty Cart Items'
);
