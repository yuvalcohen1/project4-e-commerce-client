import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CategoryModel } from 'src/app/models/Category.model';
import { fetchCheckedCategory } from 'src/app/ngrx/checked-category/checked-category.action';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  checkedCategory$?: Observable<CategoryModel>;

  @Input()
  category!: CategoryModel;

  constructor(
    private store: Store<AppState>,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkedCategory$ = this.store.select<CategoryModel>(
      (state) => state.checkedCategory
    );

    if (this.category.categoryName === 'All') {
      this.store.dispatch(
        fetchCheckedCategory({ checkedCategory: this.category })
      );
    }
  }

  async onCategoryClick() {
    try {
      if (this.category.categoryName === 'All') {
        this.store.dispatch(
          fetchCheckedCategory({ checkedCategory: this.category })
        );

        await this.productsService.fetchAllProducts();
        return;
      }

      this.store.dispatch(
        fetchCheckedCategory({ checkedCategory: this.category })
      );

      await this.productsService.fetchProductsByCategoryId(this.category._id);
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
