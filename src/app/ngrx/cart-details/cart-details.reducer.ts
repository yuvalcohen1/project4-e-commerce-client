import { createReducer, on } from '@ngrx/store';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';
import {
  closeCart,
  fetchCartDetails,
  resetCartDetails,
} from './cart-details.action';

const initialState: CartDetailsModel = {
  _id: '',
  userId: '',
  createdAt: null,
  isOpen: 1,
};

export const cartDetailsReducer = createReducer(
  initialState,
  on(fetchCartDetails, (state, { cartDetails }) => cartDetails),
  on(closeCart, (state) => {
    return {
      ...state,
      isOpen: 0,
    };
  }),
  on(resetCartDetails, () => {
    return {
      _id: '',
      userId: '',
      createdAt: null,
      isOpen: 0,
    };
  })
);
