import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './models/AppState.model';
import { CartDetailsModel } from './models/CartDetails.model';
import { CartItemModel } from './models/CartItem.model';
import { UserDetailsModel } from './models/UserDetails.model';
import { fetchCartDetails } from './ngrx/cart-details/cart-details.action';
import { fetchCartItems } from './ngrx/cart-items/cart-items.action';
import { fetchUserDetails } from './ngrx/user-details/user-details.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const userDetails: UserDetailsModel | null = JSON.parse(
      localStorage.getItem('userDetails')!
    );
    if (userDetails) {
      this.store.dispatch(fetchUserDetails({ userDetails }));
    }

    const cartDetails: CartDetailsModel | null = JSON.parse(
      localStorage.getItem('cartDetails')!
    );
    if (cartDetails) {
      this.store.dispatch(fetchCartDetails({ cartDetails }));
    }

    const cartItems: CartItemModel[] | null = JSON.parse(
      localStorage.getItem('cartItems')!
    );
    if (cartItems) {
      this.store.dispatch(fetchCartItems({ cartItems }));
    }
  }
}
