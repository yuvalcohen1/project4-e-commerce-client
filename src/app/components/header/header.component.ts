import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import { resetCartDetails } from 'src/app/ngrx/cart-details/cart-details.action';
import { emptyCartItems } from 'src/app/ngrx/cart-items/cart-items.action';
import { resetCheckedCategory } from 'src/app/ngrx/checked-category/checked-category.action';
import { resetUserDetailsToNull } from 'src/app/ngrx/user-details/user-details.action';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userDetails$?: Observable<UserDetailsModel>;

  currentPath?: string;

  constructor(
    private location: Location,
    private store: Store<AppState>,
    private productsService: ProductsService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentPath = this.location.path();

    this.userDetails$ = this.store.select<UserDetailsModel>(
      (state) => state.userDetails
    );
  }

  async onSearchClick(productName: string) {
    this.productsService.fetchProductsBySearchInput(productName);

    this.store.dispatch(resetCheckedCategory());
  }

  async onLogout() {
    await this.usersService.removeTokenCookie();

    this.store.dispatch(resetUserDetailsToNull());
    localStorage.setItem('userDetails', JSON.stringify(null));

    this.store.dispatch(resetCartDetails());
    const emptyCartDetails = {
      _id: '',
      userId: '',
      createdAt: null,
      isOpen: 0,
    };
    localStorage.setItem('cartDetails', JSON.stringify(emptyCartDetails));

    this.store.dispatch(emptyCartItems());
    localStorage.setItem('cartItems', JSON.stringify([]));

    this.router.navigate(['/home']);
  }
}
