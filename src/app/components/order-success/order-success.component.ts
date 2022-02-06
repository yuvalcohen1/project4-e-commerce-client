import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  jwt$?: Observable<string>;
  userDetails$?: Observable<UserDetailsModel>;

  @Input()
  orderSuccess?: number;

  @Output()
  newItemEvent = new EventEmitter<number>();

  constructor(
    private cartsService: CartsService,
    private ordersService: OrdersService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.jwt$ = this.store.select<string>((state) => state.jwt);

    this.userDetails$ = this.store.select<UserDetailsModel>(
      (state) => state.userDetails
    );
  }

  // async downloadReceiptFile() {
  //   const jwt = await firstValueFrom(this.jwt$!);
  //   await this.ordersService.downloadReceiptFile(jwt);
  // }

  // async onClick() {
  //   await this.ordersService.downloadReceiptFile();
  // }

  onConfirm() {
    this.newItemEvent.emit();
  }
}
