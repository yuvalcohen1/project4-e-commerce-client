import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState.model';
import { RegisterModel } from '../models/Register.model';
import { UserDetailsModel } from '../models/UserDetails.model';
import { fetchUserDetails } from '../ngrx/user-details/user-details.action';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  async setJwtCookieByLogin(loginDetails: { email: string; password: string }) {
    (await this.http
      .post<{ jwt: string }>(`${this.API_URL}/login`, loginDetails, {
        withCredentials: true,
      })
      .toPromise())!;
  }

  async setJwtCookieByRegister(userDetails: RegisterModel) {
    (await this.http
      .post<{ jwt: string }>(`${this.API_URL}/register`, userDetails, {
        withCredentials: true,
      })
      .toPromise())!;
  }

  async fetchUserDetails() {
    const userDetails = await this.http
      .get<UserDetailsModel>(`${this.API_URL}/user-details`, {
        withCredentials: true,
      })
      .toPromise();

    this.store.dispatch(fetchUserDetails({ userDetails }));
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    return userDetails;
  }

  async removeTokenCookie() {
    await this.http
      .post(
        `${this.API_URL}/delete-token-cookie`,
        {},
        { withCredentials: true }
      )
      .toPromise();
  }
}
