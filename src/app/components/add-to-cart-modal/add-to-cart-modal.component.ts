import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartDetailsModel } from 'src/app/models/CartDetails.model';
import { CartItemModel } from 'src/app/models/CartItem.model';
import { ProductModel } from 'src/app/models/Product.model';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.css'],
})
export class AddToCartModalComponent implements OnInit {
  jwt$?: Observable<string>;
  cartDetails$?: Observable<CartDetailsModel>;
  cartItems$?: Observable<CartItemModel[]>;

  @Input()
  product!: ProductModel;

  cartItems: CartItemModel[] = [];
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private cartsService: CartsService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartDetails$ = this.store.select<CartDetailsModel>(
      (state) => state.cartDetails
    );

    this.cartItems$ = this.store.select<CartItemModel[]>(
      (state) => state.cartItems
    );

    this.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });

    this.jwt$ = this.store.select<string>((state) => state.jwt);
  }

  shouldHideAddToCartBtn(): boolean {
    return this.cartItems.some(
      (cartItem) => cartItem.product._id === this.product._id
    );
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async onSaveItem(modal: any, quantity: string) {
    modal.close('Save click');

    try {
      const jwt = await firstValueFrom(this.jwt$!);
      const cartDetails = await firstValueFrom(this.cartDetails$!);
      this.cartsService.addCartItem(
        cartDetails._id,
        this.product._id!,
        Number(quantity),
        jwt
      );
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}
