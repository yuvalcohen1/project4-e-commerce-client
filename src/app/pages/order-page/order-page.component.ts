import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  orderSuccess: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showSuccessMessage() {
    this.orderSuccess = 1;
  }

  closeMessageAndMoveToLoginPage() {
    this.orderSuccess = 0;
    this.router.navigate(['/home']);
  }
}
