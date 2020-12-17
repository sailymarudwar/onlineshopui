import {Injectable} from '@angular/core';
import {Order} from "../model/order";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Category} from '../model/category';
import {Observable} from "rxjs";
import { OrderDetail } from '../model/orderdetail';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // the backend url for products, hardcoded
  readonly baseUrl: string = environment.baseUrl+'/api/orders';
  
  constructor(private http: HttpClient) { }

   /**
   * The getAll() retrieves all products
   * by given category type from the backend endpoint
   * @param categoryType
   */
  getAllOrders(): Observable<Order[]> {

    // the modified url for the backend endpoint
    const url = `${this.baseUrl}/`;

    return this.http.get<Order[]>(url);

  }

  getOrderDetails(id: string):Observable<OrderDetail[]> {

    // the modified url for the backend endpoint
    const url = `${this.baseUrl}/orderDetail/${id}`;

    return this.http.get<OrderDetail[]>(url);

  }
}
