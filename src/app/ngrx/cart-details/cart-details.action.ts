import { createAction, props } from '@ngrx/store';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';

export const fetchCartDetails = createAction(
  '[Carts Component] Fetch Cart Details',
  props<{ cartDetails: CartDetailsModel }>()
);

export const closeCart = createAction('[Carts Component] Close Cart');

export const resetCartDetails = createAction(
  '[Carts Component] Reset Cart Details'
);
