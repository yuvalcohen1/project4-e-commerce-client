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
  jwt$?: Observable<string>;
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

    this.jwt$ = this.store.select<string>((state) => state.jwt);

    if (this.category.categoryName === 'All') {
      this.store.dispatch(
        fetchCheckedCategory({ checkedCategory: this.category })
      );
    }
  }

  async onCategoryClick() {
    try {
      const jwt = await firstValueFrom(this.jwt$!);

      if (this.category.categoryName === 'All') {
        this.store.dispatch(
          fetchCheckedCategory({ checkedCategory: this.category })
        );

        await this.productsService.fetchAllProducts(jwt);
        return;
      }

      this.store.dispatch(
        fetchCheckedCategory({ checkedCategory: this.category })
      );

      await this.productsService.fetchProductsByCategoryId(
        this.category._id,
        jwt
      );
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
