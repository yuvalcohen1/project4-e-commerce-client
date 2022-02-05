import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';
import { CartItemModel } from 'src/app/models/CartItem.model';
import { getCurrentCartStatus } from 'src/app/ngrx/cart-status/cart-status.action';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  jwt$?: Observable<string>;
  cartItems$?: Observable<CartItemModel[]>;
  cartDetails$!: Observable<CartDetailsModel>;
  total?: number;

  constructor(
    private store: Store<AppState>,
    private cartsService: CartsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jwt$ = this.store.select<string>((state) => state.jwt);

    this.cartItems$ = this.store.select<CartItemModel[]>(
      (state) => state.cartItems
    );

    this.cartDetails$ = this.store.select<CartDetailsModel>(
      (state) => state.cartDetails
    );

    this.cartItems$.subscribe((cartItems) => {
      const cartItemsPrices = cartItems.map(
        (cartItem) => cartItem.product.price * cartItem.quantity!
      );
      const total = cartItemsPrices.reduce(
        (previousPrice, currentPrice) => previousPrice + currentPrice,
        0
      );
      this.total = total;
    });
  }

  async onEmptyCartItems() {
    try {
      const jwt = await firstValueFrom(this.jwt$!);
      const cartDetails = await firstValueFrom(this.cartDetails$);
      this.cartsService.emptyCartItemsByCartId(cartDetails._id, jwt);
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }

  onCartClick() {
    this.store.dispatch(getCurrentCartStatus());
  }

  onCheckoutClick() {
    this.router.navigate(['/order']);
  }
}
