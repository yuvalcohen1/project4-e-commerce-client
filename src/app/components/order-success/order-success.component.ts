import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  userDetails$?: Observable<UserDetailsModel>;

  @Input()
  orderSuccess?: number;

  @Output()
  newItemEvent = new EventEmitter<number>();

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userDetails$ = this.store.select<UserDetailsModel>(
      (state) => state.userDetails
    );
  }

  onConfirm() {
    this.newItemEvent.emit();
  }
}
