import { ProductModel } from './Product.model';

export interface CartItemModel {
  _id?: string;
  product: ProductModel;
  quantity: number | null;
  cartId: string;
}
