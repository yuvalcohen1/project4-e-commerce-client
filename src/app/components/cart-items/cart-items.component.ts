import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartItemModel } from 'src/app/models/CartItem.model';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  jwt$?: Observable<string>;
  cartItems$?: Observable<CartItemModel[]>;

  constructor(
    private store: Store<AppState>,
    private cartsService: CartsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select<CartItemModel[]>(
      (state) => state.cartItems
    );

    this.jwt$ = this.store.select<string>((state) => state.jwt);
  }

  async onDeleteCartItem(cartItemId: string) {
    try {
      const jwt = await firstValueFrom(this.jwt$!);
      await this.cartsService.deleteCartItem(cartItemId, jwt);
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
