import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutBoxComponent } from './components/about-box/about-box.component';
import { AddToCartModalComponent } from './components/add-to-cart-modal/add-to-cart-modal.component';
import { AdminProductsManagementBoxComponent } from './components/admin-products-management-box/admin-products-management-box.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { LoginBoxComponent } from './components/login-box/login-box.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterBoxComponent } from './components/register-box/register-box.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AppState } from './models/AppState.model';
import { adminPressedProductReducer } from './ngrx/admin-pressed-product/admin-pressed-product.reducer';
import { cartDetailsReducer } from './ngrx/cart-details/cart-details.reducer';
import { cartItemsReducer } from './ngrx/cart-items/cart-items.reducer';
import { cartStatusReducer } from './ngrx/cart-status/cart-status.reducer';
import { categoriesReducer } from './ngrx/categories/categories.reducer';
import { checkedCategoryReducer } from './ngrx/checked-category/checked-category.reducer';
import { citiesReducer } from './ngrx/cities/cities.reducer';
import { jwtReducer } from './ngrx/jwt/jwt.reducer';
import { productsReducer } from './ngrx/products/products.reducer';
import { userDetailsReducer } from './ngrx/user-details/user-details.reducer';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ShoppingPageComponent } from './pages/shopping-page/shopping-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginBoxComponent,
    AboutBoxComponent,
    InfoBoxComponent,
    RegisterPageComponent,
    RegisterBoxComponent,
    ShoppingPageComponent,
    ShoppingCartComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductsComponent,
    AddToCartModalComponent,
    CartItemsComponent,
    OrderPageComponent,
    OrderDetailsComponent,
    OrderFormComponent,
    OrderSuccessComponent,
    AdminProductsManagementBoxComponent,
    ErrorPageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot<AppState>({
      jwt: jwtReducer,
      userDetails: userDetailsReducer,
      products: productsReducer,
      cartStatus: cartStatusReducer,
      categories: categoriesReducer,
      checkedCategory: checkedCategoryReducer,
      cartDetails: cartDetailsReducer,
      cartItems: cartItemsReducer,
      pressedProduct: adminPressedProductReducer,
      cities: citiesReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    NgbModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
