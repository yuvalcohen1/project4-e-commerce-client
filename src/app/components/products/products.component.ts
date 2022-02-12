import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartItemModel } from 'src/app/models/CartItem.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import { ProductModel } from 'src/app/models/Product.model';
import { fetchPressedProduct } from 'src/app/ngrx/admin-pressed-product/admin-pressed-product.action';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  userDetails$?: Observable<UserDetailsModel>;
  pressedProduct?: Observable<ProductModel>;
  products$?: Observable<ProductModel[]>;
  cartItems$?: Observable<CartItemModel[]>;

  constructor(
    private store: Store<AppState>,
    private productsService: ProductsService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      await this.productsService.fetchAllProducts();

      this.userDetails$ = this.store.select<UserDetailsModel>(
        (state) => state.userDetails
      );

      this.products$ = this.store.select<ProductModel[]>(
        (state) => state.products
      );

      this.pressedProduct = this.store.select<ProductModel>(
        (state) => state.pressedProduct
      );

      this.cartItems$ = this.store.select<CartItemModel[]>(
        (state) => state.cartItems
      );
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }

  async onProductClick(product: ProductModel) {
    try {
      const userDetails = await firstValueFrom(this.userDetails$!);
      if (userDetails.isAdmin === 1) {
        this.store.dispatch(fetchPressedProduct({ pressedProduct: product }));
        return;
      }

      return null;
    } catch (error) {
      this.router.navigate(['/error']);
      return;
    }
  }
}
