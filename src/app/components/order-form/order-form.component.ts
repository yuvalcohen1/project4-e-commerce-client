import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';
import { CartItemModel } from 'src/app/models/CartItem.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import { OrderModel } from 'src/app/models/Order.model';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  form!: FormGroup;

  cartDetails$!: Observable<CartDetailsModel>;
  userDetails$?: Observable<UserDetailsModel>;
  cartItems$?: Observable<CartItemModel[]>;
  cities$?: Observable<string[]>;

  datesWithThreeOrders: string[] = [];

  minDate: NgbDateStruct = {
    year: this.calendar.getToday().year,
    month: this.calendar.getToday().month,
    day: this.calendar.getToday().day,
  };

  @Output()
  newItemEvent = new EventEmitter<number>();

  constructor(
    private store: Store<AppState>,
    private calendar: NgbCalendar,
    private cartsService: CartsService,
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      cityForShipping: this.fb.control('', Validators.required),
      streetForShipping: this.fb.control('', Validators.required),
      shippingDate: this.fb.control(new Date(), Validators.required),
      creditCardNumber: this.fb.control('', Validators.required),
    });

    this.datesWithThreeOrders =
      await this.ordersService.fetchDatesWithThreeOrders();

    this.cartDetails$ = this.store.select<CartDetailsModel>(
      (state) => state.cartDetails
    );

    this.userDetails$ = this.store.select<UserDetailsModel>(
      (state) => state.userDetails
    );

    this.cartItems$ = this.store.select<CartItemModel[]>(
      (state) => state.cartItems
    );

    this.cities$ = this.store.select<string[]>((state) => state.cities);

    this.userDetails$.subscribe((userDetails) => {
      if (userDetails) {
        if (userDetails.city && userDetails.street) {
          this.form.patchValue({
            cityForShipping: userDetails.city,
            streetForShipping: userDetails.street,
          });
        }
      }
    });
  }

  disableDates = (date: NgbDate) => {
    const datesObjs: { year: number; month: number; day: number }[] =
      this.datesWithThreeOrders!.map((d) => {
        return {
          year: new Date(d).getFullYear(),
          month: new Date(d).getMonth() + 1,
          day: new Date(d).getDate(),
        };
      });
    return datesObjs.some(
      (dateObj) =>
        dateObj.year === date.year &&
        dateObj.month === date.month &&
        dateObj.day === date.day
    );
  };

  async onSubmit() {
    try {
      const cartDetails = await firstValueFrom(this.cartDetails$);
      const userDetails = await firstValueFrom(this.userDetails$!);
      const { _id: userId } = userDetails;
      const cartItems = await firstValueFrom(this.cartItems$!);
      const cartItemsPrices = cartItems.map(
        (cartItem) => cartItem.product.price * cartItem.quantity!
      );

      const finalPrice = cartItemsPrices.reduce(
        (previousPrice, currentPrice) => previousPrice + currentPrice,
        0
      );

      const fourLastDigitsOfPayment =
        this.form.value.creditCardNumber.slice(-4);
      const formattedDate = this.formatDate(
        this.form.get('shippingDate')!.value
      );

      const orderBody: OrderModel = {
        cartId: cartDetails!._id,
        userId,
        finalPrice,
        cityForShipping: this.form.get('cityForShipping')!.value,
        streetForShipping: this.form.get('streetForShipping')!.value,
        shippingDate: formattedDate,
        fourLastDigitsOfPayment: Number(fourLastDigitsOfPayment),
      };

      await this.ordersService.createOrder(orderBody);

      await this.cartsService.closeCart(cartDetails!._id);

      this.newItemEvent.emit();
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }

  formatDate(dateObj: any) {
    const dateStr = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;

    const date = new Date(dateStr);

    const nextDate = new Date(date.setDate(date.getDate() + 1));

    return nextDate;
  }
}
