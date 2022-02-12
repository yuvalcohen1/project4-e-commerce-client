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
  cartStatus$?: Observable<number>;

  categories?: CategoryModel[];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  async ngOnInit() {
    try {
      this.cartStatus$ = this.store.select<number>((state) => state.cartStatus);

      const categories = await this.categoriesService.fetchCategories();
      this.categories = categories;
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
