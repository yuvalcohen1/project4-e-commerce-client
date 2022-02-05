import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import { ProductModel } from 'src/app/models/Product.model';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css'],
})
export class InfoBoxComponent implements OnInit {
  jwt$?: Observable<string>;
  userDetails$?: Observable<UserDetailsModel>;
  cartDetails$?: Observable<Partial<CartDetailsModel>>;
  availableProducts$?: Observable<ProductModel[]>;

  notifications: string = '';
  numOfAllOrders?: number;
  numOfAvailableProducts?: number;
  pipe = new DatePipe('en-US');

  constructor(
    private store: Store<AppState>,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.numOfAvailableProducts =
        await this.productsService.fetchNumOfAvailableProducts();

      const numOfAllOrders: number =
        (await this.ordersService.fetchNumOfAllOrders())!;
      this.numOfAllOrders = numOfAllOrders;

      this.jwt$ = this.store.select<string>((state) => state.jwt);

      this.userDetails$ = this.store.select<UserDetailsModel>(
        (state) => state.userDetails
      );

      this.cartDetails$ = this.store.select<Partial<CartDetailsModel>>(
        (state) => state.cartDetails
      );

      this.cartDetails$.subscribe((cartDetails) => {
        this.jwt$?.subscribe((jwt) => {
          if (jwt) {
            this.ordersService
              .fetchLastOrderDate(jwt)
              .subscribe((lastOrderDate) => {
                if (cartDetails._id) {
                  this.notifications = `You have an open cart from ${this.pipe.transform(
                    cartDetails.createdAt,
                    'shortDate'
                  )!}`;
                } else if (!cartDetails._id && lastOrderDate) {
                  this.notifications = `Your last purchase was on ${this.pipe.transform(
                    lastOrderDate,
                    'shortDate'
                  )!}`;
                } else {
                  this.notifications = `Welcome to your first purchase!`;
                }
              });
          }
        });
      });
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
