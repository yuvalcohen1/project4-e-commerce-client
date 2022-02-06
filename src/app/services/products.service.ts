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

  async fetchAllProducts(jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }),
    };

    const products = (await this.http
      .get<ProductModel[]>(`${this.API_URL}/all`, httpOptions)
      .toPromise())!;

    this.store.dispatch(fetchProducts({ products }));

    return products;
  }

  async fetchProductsByCategoryId(categoryId: string, jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }),
    };

    const products = (await this.http
      .get<ProductModel[]>(`${this.API_URL}/${categoryId}`, httpOptions)
      .toPromise())!;

    this.store.dispatch(fetchProducts({ products }));
    return products;
  }

  async fetchProductsBySearchInput(productName: string, jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }),
    };

    const products = (await this.http
      .get<ProductModel[]>(`${this.API_URL}/search/${productName}`, httpOptions)
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

  async addProduct(addProductBody: Partial<ProductModel>, jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }),
    };

    const newProduct = (await this.http
      .post<ProductModel>(
        `${this.API_URL}/add-product`,
        addProductBody,
        httpOptions
      )
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

  async updateProduct(updateProductBody: Partial<ProductModel>, jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }),
    };

    const updatedProduct = (await this.http
      .put<ProductModel>(
        `${this.API_URL}/update-product`,
        updateProductBody,
        httpOptions
      )
      .toPromise())!;
    this.store.dispatch(updateProduct({ updatedProduct }));
    return updatedProduct;
  }
}
