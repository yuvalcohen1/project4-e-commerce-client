import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import { resetCartDetails } from 'src/app/ngrx/cart-details/cart-details.action';
import { emptyCartItems } from 'src/app/ngrx/cart-items/cart-items.action';
import { resetCheckedCategory } from 'src/app/ngrx/checked-category/checked-category.action';
import { resetUserDetailsToNull } from 'src/app/ngrx/user-details/user-details.action';
import { resetJwt } from 'src/app/ngrx/jwt/jwt.action';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  jwt$?: Observable<string>;
  userDetails$?: Observable<UserDetailsModel>;

  currentPath?: string;

  constructor(
    private location: Location,
    private store: Store<AppState>,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentPath = this.location.path();
    console.log(this.currentPath);

    this.jwt$ = this.store.select<string>((state) => state.jwt);

    this.userDetails$ = this.store.select<UserDetailsModel>(
      (state) => state.userDetails
    );
  }

  async onSearchClick(productName: string) {
    const jwt = await firstValueFrom(this.jwt$!);
    this.productsService.fetchProductsBySearchInput(productName, jwt);

    this.store.dispatch(resetCheckedCategory());
  }

  onLogout() {
    this.store.dispatch(resetJwt());
    localStorage.setItem('jwt', JSON.stringify(''));

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
