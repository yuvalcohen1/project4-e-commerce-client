import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/Product.model';

export const fetchPressedProduct = createAction(
  '[Products Component] Fetch Pressed Product',
  props<{ pressedProduct: ProductModel }>()
);

export const resetPressedProduct = createAction(
  '[Products Component] Reset Pressed Product'
);
