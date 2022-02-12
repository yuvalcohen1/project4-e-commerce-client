import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AppState } from '../models/AppState.model';
import { ProductModel } from '../models/Product.model';
import {
  addProduct,
  fetchProducts,
  updateProduct,
} from '../ngrx/products/products.action';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  async fetchAllProducts() {
    const products = (await this.http
      .get<ProductModel[]>(`${this.API_URL}/all`, { withCredentials: true })
      .toPromise())!;

    this.store.dispatch(fetchProducts({ products }));

    return products;
  }

  async fetchProductsByCategoryId(categoryId: string) {
    const products = (await this.http
      .get<ProductModel[]>(`${this.API_URL}/${categoryId}`, {
        withCredentials: true,
      })
      .toPromise())!;

    this.store.dispatch(fetchProducts({ products }));
    return products;
  }

  async fetchProductsBySearchInput(productName: string) {
    const products = (await this.http
      .get<ProductModel[]>(`${this.API_URL}/search/${productName}`, {
        withCredentials: true,
      })
      .toPromise())!;

    this.store.dispatch(fetchProducts({ products }));
  }

  async fetchNumOfAvailableProducts() {
    const { numOfAvailableProducts } = (await this.http
      .get<{ numOfAvailableProducts: number }>(
        `${this.API_URL}/num-of-available-products`
      )
      .toPromise())!;

    return numOfAvailableProducts;
  }

  async addProduct(addProductBody: Partial<ProductModel>) {
    const newProduct = (await this.http
      .post<ProductModel>(`${this.API_URL}/add-product`, addProductBody, {
        withCredentials: true,
      })
      .toPromise())!;

    const checkedCategory = await firstValueFrom(
      this.store.select((state) => state.checkedCategory)
    );
    if (
      checkedCategory.categoryName === 'All' ||
      checkedCategory._id === newProduct.categoryId
    ) {
      this.store.dispatch(addProduct({ newProduct }));
    }

    return newProduct;
  }

  async updateProduct(updateProductBody: Partial<ProductModel>) {
    const updatedProduct = (await this.http
      .put<ProductModel>(`${this.API_URL}/update-product`, updateProductBody, {
        withCredentials: true,
      })
      .toPromise())!;
    this.store.dispatch(updateProduct({ updatedProduct }));
    return updatedProduct;
  }
}
