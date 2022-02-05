import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartItemModel } from 'src/app/models/CartItem.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  cartItems$?: Observable<CartItemModel[]>;
  total?: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select<CartItemModel[]>(
      (state) => state.cartItems
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
}
