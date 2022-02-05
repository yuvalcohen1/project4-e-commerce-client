import { createReducer, on } from '@ngrx/store';
import { ProductModel } from 'src/app/models/Product.model';
import { addProduct, fetchProducts, updateProduct } from './products.action';

const initialState: ProductModel[] = [];

export const productsReducer = createReducer(
  initialState,
  on(fetchProducts, (state, { products }) => products),
  on(addProduct, (state, { newProduct }) => [...state, newProduct]),
  on(updateProduct, (state, { updatedProduct }) => {
    const productIndex = state.findIndex((p) => p._id === updatedProduct._id);
    const products = state.slice();
    products.splice(productIndex, 1, updatedProduct);
    return products;
  })
);
