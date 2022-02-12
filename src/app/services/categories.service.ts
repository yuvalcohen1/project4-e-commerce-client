import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState.model';
import { CategoryModel } from '../models/Category.model';
import { fetchCategories } from '../ngrx/categories/categories.action';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private API_URL = 'http://localhost:3000/categories';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  async fetchCategories() {
    const categories = (await this.http
      .get<CategoryModel[]>(this.API_URL, { withCredentials: true })
      .toPromise())!;

    this.store.dispatch(fetchCategories({ categories }));

    return categories;
  }
}
