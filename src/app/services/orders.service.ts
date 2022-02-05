import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState.model';
import { UserDetailsModel } from '../models/UserDetails.model';
import { OrderModel } from '../models/Order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private API_URL = 'http://localhost:3000/orders';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  async fetchNumOfAllOrders() {
    const { numOfAllOrders } = (await this.http
      .get<{ numOfAllOrders: number }>(`${this.API_URL}/num-of-all-orders`)
      .toPromise())!;
    return numOfAllOrders;
  }

  fetchLastOrderDate(jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }),
    };

    return this.http.get<string>(
      `${this.API_URL}/last-order-date`,
      httpOptions
    );
  }

  async fetchDatesWithThreeOrders(jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }),
    };

    const datesWithThreeOrders = (await this.http
      .get<string[]>(`${this.API_URL}/dates-with-three-orders`, httpOptions)
      .toPromise())!;
    return datesWithThreeOrders;
  }

  async createOrder(orderBody: OrderModel, jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }),
    };

    const newOrder = (await this.http
      .post<OrderModel>(`${this.API_URL}/create-order`, orderBody, httpOptions)
      .toPromise())!;

    return newOrder;
  }

  async downloadReceiptFile(jwt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwt}`,
      }),
    };

    return await this.http
      .get(`${this.API_URL}/receipt-file`, httpOptions)
      .toPromise();
  }
}
