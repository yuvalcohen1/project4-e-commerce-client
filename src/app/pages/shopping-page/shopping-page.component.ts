import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css'],
})
export class ShoppingPageComponent implements OnInit {
  jwt$?: Observable<string>;
  cartStatus$?: Observable<number>;
  userDetails$?: Observable<UserDetailsModel>;
  cartDetails$?: Observable<CartDetailsModel>;

  constructor(
    private cartsService: CartsService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  async ngOnInit() {
    this.jwt$ = this.store.select<string>((state) => state.jwt);
    this.cartStatus$ = this.store.select((state) => state.cartStatus);
    this.userDetails$ = this.store.select((state) => state.userDetails);
    this.cartDetails$ = this.store.select((state) => state.cartDetails);

    try {
      const jwt = await firstValueFrom(this.jwt$!);
      const userDetails = await firstValueFrom(this.userDetails$);
      const cartDetails = await firstValueFrom(this.cartDetails$);
      if (userDetails && cartDetails) {
        if (!cartDetails.isOpen && !userDetails.isAdmin) {
          await this.cartsService.createCart(jwt);
        }
      }

      if (!jwt || !userDetails) {
        this.router.navigate(['/error']);
      }
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
