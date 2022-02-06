import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState.model';
import { UserDetailsModel } from '../models/UserDetails.model';
import { RegisterModel } from '../models/Register.model';
import { fetchUserDetails } from '../ngrx/user-details/user-details.action';
import { fetchJwt } from '../ngrx/jwt/jwt.action';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  async fetchJwtByLogin(loginDetails: { email: string; password: string }) {
    const { jwt } = (await this.http
      .post<{ jwt: string }>(`${this.API_URL}/login`, loginDetails)
      .toPromise())!;

    this.store.dispatch(fetchJwt({ jwt }));
    localStorage.setItem('jwt', JSON.stringify(jwt));

    return jwt;
  }

  async fetchJwtByRegister(userDetails: RegisterModel) {
    const { jwt } = (await this.http
      .post<{ jwt: string }>(`${this.API_URL}/register`, userDetails)
      .toPromise())!;

    this.store.dispatch(fetchJwt({ jwt }));
    localStorage.setItem('jwt', JSON.stringify(jwt));

    return { jwt };
  }

  async fetchUserDetails(jwt: string) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${jwt}`,
    //   }),
    // };

    const userDetails = await this.http
      .get<UserDetailsModel>(`${this.API_URL}/user-details`)
      .toPromise();

    this.store.dispatch(fetchUserDetails({ userDetails }));
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    return userDetails;
  }
}
