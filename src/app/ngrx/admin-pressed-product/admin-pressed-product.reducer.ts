import { createReducer, on } from '@ngrx/store';
import { ProductModel } from 'src/app/models/Product.model';
import {
  fetchPressedProduct,
  resetPressedProduct,
} from './admin-pressed-product.action';

const initialState: ProductModel = {
  productName: '',
  categoryId: '',
  imgUrl: '',
  price: 0,
};

export const adminPressedProductReducer = createReducer(
  initialState,
  on(fetchPressedProduct, (state, { pressedProduct }) => pressedProduct),
  on(resetPressedProduct, () => initialState)
);
