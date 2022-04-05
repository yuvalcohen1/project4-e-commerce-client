import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css'],
})
export class LoginBoxComponent implements OnInit {
  userDetails$?: Observable<UserDetailsModel>;
  cartDetails$?: Observable<CartDetailsModel>;

  email?: string;
  password?: string;
  jwtErrorMessage: string = '';
  pipe = new DatePipe('en-US');

  constructor(
    private usersService: UsersService,
    private cartsService: CartsService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.userDetails$ = this.store.select<UserDetailsModel>(
        (state) => state.userDetails
      );

      this.cartDetails$ = this.store.select<CartDetailsModel>(
        (state) => state.cartDetails
      );

      const cartDetails = await firstValueFrom(this.cartDetails$);
      if (!cartDetails) {
        await this.cartsService.fetchCartDetails();
      }
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }

  async onStartShoppingClick() {
    try {
      await this.cartsService.createCart();

      this.router.navigate(['/shopping']);
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }

  async onResumeShoppingOrManageProducts() {
    this.router.navigate(['/shopping']);
  }

  async onSubmit(loginForm: any) {
    try {
      const loginDetails = {
        email: this.email!,
        password: this.password!,
      };

      await this.usersService.setJwtCookieByLogin(loginDetails);

      loginForm.reset();

      const userDetails = await this.usersService.fetchUserDetails();

      const cartDetails = await this.cartsService.fetchCartDetails();

      if (cartDetails) {
        await this.cartsService.fetchCartItemsByCartId(cartDetails._id);
      }

      if (userDetails?.isAdmin === 1) {
        this.router.navigate(['/shopping']);
      }
    } catch (error: any) {
      if (error.status === 401) {
        this.jwtErrorMessage = error.error;
        setTimeout(() => {
          this.jwtErrorMessage = '';
        }, 4500);
      } else {
        this.router.navigate(['/error']);
      }
    }
  }
}
