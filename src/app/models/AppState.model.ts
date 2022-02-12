import { CartDetailsModel } from './CartDetails.model';
import { CartItemModel } from './CartItem.model';
import { CategoryModel } from './Category.model';
import { ProductModel } from './Product.model';

export interface AppState {
  userDetails: any; // UserDetailsModel | null
  products: ProductModel[];
  categories: CategoryModel[];
  cartStatus: number;
  checkedCategory: CategoryModel;
  cartDetails: CartDetailsModel;
  cartItems: CartItemModel[];
  pressedProduct: ProductModel;
  cities: string[];
}
