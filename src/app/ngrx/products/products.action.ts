import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/Product.model';

export const fetchProducts = createAction(
  '[Products Component] Fetch Products',
  props<{ products: ProductModel[] }>()
);

export const addProduct = createAction(
  '[Products Component] Add Product',
  props<{ newProduct: ProductModel }>()
);

export const updateProduct = createAction(
  '[Products Component] Update Product',
  props<{ updatedProduct: ProductModel }>()
);
