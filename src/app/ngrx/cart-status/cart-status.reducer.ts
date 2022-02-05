import { createReducer, on } from '@ngrx/store';
import { getCurrentCartStatus } from './cart-status.action';

const initialState: number = 0;

export const cartStatusReducer = createReducer(
  initialState,
  on(getCurrentCartStatus, (state) => (state === 1 ? 0 : 1))
);
