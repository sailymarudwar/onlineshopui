import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {CartItem} from "../../../model/cart-item";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  quantity: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.quantity=0;
    this.updateCartStatus();
  }

  updateCartStatus() {
    this.cartService.getTotalQuantity().subscribe(
      data => {
        this.quantity = data;
      }
    );
  }
}
