import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CategoryModel } from 'src/app/models/Category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  jwt$?: Observable<string>;
  cartStatus$?: Observable<number>;

  categories?: CategoryModel[];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  async ngOnInit() {
    try {
      this.jwt$ = this.store.select<string>((state) => state.jwt);
      this.cartStatus$ = this.store.select<number>((state) => state.cartStatus);

      const jwt = await firstValueFrom(this.jwt$);
      const categories = await this.categoriesService.fetchCategories(jwt);
      this.categories = categories;
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
