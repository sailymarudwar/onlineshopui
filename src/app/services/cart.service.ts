import { Injectable } from '@angular/core';
import {CartItem} from "../model/cart-item";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {HttpHeaders} from '@angular/common/http';
import {Order} from '../model/order';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  // the api url for shopping cart
  readonly baseUrl: string = '/api/shopping-cart';

  constructor(private http: HttpClient) { }

  getCartItemsList(): Observable<any> {
    // cart endpoint url
    const cartUrl: string = `${this.baseUrl}`

    return this.http.get(cartUrl);
  }

  addItem(cartItem: CartItem): Observable<CartItem[]> {
    var header = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    // the modified url for the backend endpoint
    const addUrl: string = `${this.baseUrl}/add-to-cart`
    return this.http.post<CartItem[]>(addUrl, JSON.stringify(cartItem), {
      headers: header
    });

  }

  updateCartItem(cartItem: CartItem,st:String): Observable<CartItem[]> {
    var header = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    // the modified url for the backend endpoint
    const addUrl: string = `${this.baseUrl}/update-cart-item`
    return this.http.post<CartItem[]>(addUrl+ '/'+ st, JSON.stringify(cartItem), {
      headers: header
    });

  }


  placeOrder(): Observable<Order> {
    // get-quantity endpoint url
    const orderUrl: string = `${this.baseUrl}/placeorder`

    return this.http.get<Order>(orderUrl);

  }

  removeItem(id: string): Observable<any> {
    // delete endpoint url
    const deleteUrl: string = `${this.baseUrl}/remove-from-cart/${id}`

    return this.http.delete(deleteUrl);
  }

  getTotalQuantity(): Observable<number> {
    // get-quantity endpoint url
    const quantityUrl: string = `${this.baseUrl}/totalQuantity`

    return this.http.get<number>(quantityUrl);
  }

  getTotalPrice(): Observable<any> {
    // get-total-value endpoint url
    const totalValueUrl: string = `${this.baseUrl}/totalPrice`

    return this.http.get(totalValueUrl);
  }
}
