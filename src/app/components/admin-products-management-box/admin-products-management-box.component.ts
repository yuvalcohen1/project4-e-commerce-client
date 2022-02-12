import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';
import { CategoryModel } from 'src/app/models/Category.model';
import { ProductModel } from 'src/app/models/Product.model';
import { resetPressedProduct } from 'src/app/ngrx/admin-pressed-product/admin-pressed-product.action';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-products-management-box',
  templateUrl: './admin-products-management-box.component.html',
  styleUrls: ['./admin-products-management-box.component.css'],
})
export class AdminProductsManagementBoxComponent implements OnInit {
  categories$?: Observable<CategoryModel[]>;
  pressedProduct$?: Observable<ProductModel>;
  cartDetails$?: Observable<CartDetailsModel>;

  showAddProduct: boolean = false;

  constructor(
    private store: Store<AppState>,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this.store.select<CategoryModel[]>(
      (state) => state.categories
    );

    this.pressedProduct$ = this.store.select<ProductModel>(
      (state) => state.pressedProduct
    );
  }

  onPlusClick() {
    this.store.dispatch(resetPressedProduct());
    this.showAddProduct = true;
  }

  async onSave(
    categoryId: string,
    imgUrl: string,
    price: string,
    productName: string,
    productForm: any
  ) {
    try {
      const pressedProduct = await firstValueFrom(this.pressedProduct$!);
      if (pressedProduct._id) {
        const priceAsNumber = Number(price);
        const updateProductBody: Partial<ProductModel> = {
          _id: pressedProduct._id,
          categoryId,
          imgUrl,
          price: priceAsNumber,
          productName,
        };
        await this.productsService.updateProduct(updateProductBody);
        return;
      }

      const priceAsNumber = Number(price);
      const addProductBody: Partial<ProductModel> = {
        categoryId,
        imgUrl,
        price: priceAsNumber,
        productName,
      };
      await this.productsService.addProduct(addProductBody);
      productForm.reset();
      return;
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
