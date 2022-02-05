export interface ShoppingCartModel {
  _id?: string;
  userId: string;
  createdAt: Date;
  cartProducts: string[];
}
