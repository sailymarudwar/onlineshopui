import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../../model/cart-item";
import {CartService} from "../../../services/cart.service";
import { Order } from 'src/app/model/order';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  // to hold the cart item list
  cartItems: CartItem[] = [];
  // to hold the placed order
  order:Order;
  // the columns to display
  displayedColumns: string[] = ["imageUrl", "name", "price", "subtotal", "action"];
  cartTotalPrice: number;

  constructor(private cartService: CartService,private router: Router,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fetchCartItems();
    this.getCartTotalPrice();
  }

  placeOrder() {
    this.cartService.placeOrder().subscribe(
      order => {
        // store the cart item list response
        this.order = order;
        alert('Order Placed Successfully' + this.order.id);
        let element = document.getElementById('cartCount') as HTMLElement;
        if (element != null) {
          element.children[0].innerHTML = 0+'';
        }
        this.router.navigateByUrl(`/orders/orderDetails/` + this.order.id);
      }, error => {
        alert('Error Creating Order' + error);
      }
    );
  }

  fetchCartItems() {
    this.cartService.getCartItemsList().subscribe(
      cartItems => {
        // store the cart item list response
        this.cartItems = cartItems
      }
    );
  }

  removeCartItem(cartItemToRemove: CartItem) {
    this.cartService.removeItem(cartItemToRemove.product.id).subscribe(
      data => {
        const snack = this._snackBar.open(cartItemToRemove.product.name+' Removed from Cart', '', {
                  duration: 5000,
                  verticalPosition: 'top'
        });
        window.location.reload();
      },error => {
        window.location.reload();
      }
    );
  }

  increment(cartItem: CartItem) {
    // increment the cart item's quantity

    console.log(cartItem.quantity);
    if (cartItem.product.stock == 0) {
      const snack = this._snackBar.open('Oops! Maximum stock quantity reached', '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    } else {
      cartItem.quantity = cartItem.quantity + 1;
      // update the cart item
      this.cartService.updateCartItem(cartItem, 'increment').subscribe(
        data => {

          window.location.reload();
          console.log(data)
        });

    }
   

    // calculate total price
   // this.getCartTotalPrice();
  }

  decrement(cartItem: CartItem) {
    // decrement the cart item's quantity
    cartItem.quantity = cartItem.quantity - 1;

    console.log(cartItem.quantity);

    if (cartItem.quantity <= 0) {
      // remove the cart item
      this.removeCartItem(cartItem);
    } else {
      // update the cart item
      this.cartService.updateCartItem(cartItem,'decrement').subscribe(data => {
        window.location.reload();
        console.log(data)
      });
    }
  }

  getCartTotalPrice() {
    this.cartService.getTotalPrice().subscribe(
      totalPrice => {
        this.cartTotalPrice = totalPrice;
        console.log(totalPrice);
      }, error => {
        console.log(error);
      }
    );
  }
}
