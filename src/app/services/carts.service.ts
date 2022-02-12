import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartDetailsModel } from '../models/CartDetails.model';
import { CartItemModel } from '../models/CartItem.model';
import {
  closeCart,
  fetchCartDetails,
  resetCartDetails,
} from '../ngrx/cart-details/cart-details.action';
import {
  addCartItem,
  deleteCartItem,
  emptyCartItems,
  fetchCartItems,
} from '../ngrx/cart-items/cart-items.action';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  SHOPPING_CARTS_API_URL = `http://localhost:3000/shopping-carts`;
  CART_ITEMS_API_URL = `http://localhost:3000/cart-items`;

  constructor(private http: HttpClient, private store: Store) {}

  async fetchCartDetails() {
    const cartDetails = (await this.http
      .get<CartDetailsModel>(`${this.SHOPPING_CARTS_API_URL}`, {
        withCredentials: true,
      })
      .toPromise())!;

    if (!cartDetails) {
      this.store.dispatch(resetCartDetails());
      const emptyCartDetails = {
        _id: '',
        userId: '',
        createdAt: null,
        isOpen: 0,
      };

      localStorage.setItem('cartDetails', JSON.stringify(emptyCartDetails));
      return;
    }

    this.store.dispatch(fetchCartDetails({ cartDetails }));
    localStorage.setItem('cartDetails', JSON.stringify(cartDetails));

    return cartDetails;
  }

  async createCart() {
    const newCart = await this.http
      .post<CartDetailsModel>(
        `${this.SHOPPING_CARTS_API_URL}/create-cart`,
        {},
        { withCredentials: true }
      )
      .toPromise();

    this.store.dispatch(fetchCartDetails({ cartDetails: newCart! }));
    localStorage.setItem('cartDetails', JSON.stringify(newCart));

    return newCart;
  }

  async closeCart(cartId: string) {
    const closedCart = await this.http
      .put(
        `${this.SHOPPING_CARTS_API_URL}/close-cart/${cartId}`,
        {},
        { withCredentials: true }
      )
      .toPromise();

    this.store.dispatch(closeCart());

    localStorage.setItem('cartDetails', JSON.stringify(closedCart));

    this.store.dispatch(emptyCartItems());
    localStorage.setItem('cartItems', JSON.stringify([]));
  }

  async fetchCartItemsByCartId(cartId: string) {
    const cartItems = (await this.http
      .get<CartItemModel[]>(`${this.CART_ITEMS_API_URL}/${cartId}`, {
        withCredentials: true,
      })
      .toPromise())!;

    this.store.dispatch(fetchCartItems({ cartItems }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return cartItems;
  }

  async addCartItem(cartId: string, product: string, quantity: number) {
    const addCartItemBody = { cartId, product, quantity };
    const newCartItem = (await this.http
      .post<CartItemModel>(
        `${this.CART_ITEMS_API_URL}/add-cart-item`,
        addCartItemBody,
        { withCredentials: true }
      )
      .toPromise())!;

    this.store.dispatch(addCartItem({ newCartItem }));

    const cartItems: CartItemModel[] = JSON.parse(
      localStorage.getItem('cartItems')!
    );
    if (!cartItems) {
      localStorage.setItem('cartItems', JSON.stringify([newCartItem]));
      return;
    }
    cartItems.push(newCartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  async deleteCartItem(cartItemId: string) {
    await this.http
      .delete(`${this.CART_ITEMS_API_URL}/delete-cart-item/${cartItemId}`, {
        withCredentials: true,
      })
      .toPromise();

    this.store.dispatch(deleteCartItem({ deletedCartItemId: cartItemId }));

    const cartItems: CartItemModel[] = JSON.parse(
      localStorage.getItem('cartItems')!
    );
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === cartItemId
    );
    cartItems.splice(cartItemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  async emptyCartItemsByCartId(cartId: string) {
    await this.http
      .delete(`${this.CART_ITEMS_API_URL}//empty-cart-items/${cartId}`, {
        withCredentials: true,
      })
      .toPromise();

    this.store.dispatch(emptyCartItems());

    localStorage.setItem('cartItems', JSON.stringify([]));
  }
}
