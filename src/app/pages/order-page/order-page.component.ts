import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartItemModel } from 'src/app/models/CartItem.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  orderSuccess: number = 0;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {}

  showSuccessMessage() {
    this.orderSuccess = 1;
  }

  closeMessageAndMoveToLoginPage() {
    this.orderSuccess = 0;
    this.router.navigate(['/home']);
  }
}
