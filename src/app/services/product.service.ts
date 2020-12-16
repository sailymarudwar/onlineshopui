import {Injectable} from '@angular/core';
import {Product} from "../model/product";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Category} from '../model/category';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    apiUrl = "/api"

  // the backend url for products, hardcoded
  readonly baseUrl: string = '/api/products';

  constructor(private http: HttpClient) {
  }

  /**
   * The getAll() retrieves all products
   * by given category type from the backend endpoint
   * @param categoryType
   */
  getAll(categoryType: number): Observable<Product[]> {

    // the modified url for the backend endpoint
    const searchUrl = `${this.baseUrl}/search/category/${categoryType}`;

    return this.http.get<Product[]>(searchUrl);

  }

  getAllElevated(): Observable<any> {
    // the modified url for the backend endpoint
    const searchUrl = `${this.baseUrl}/admin/allProducts`;
    return this.http.get(searchUrl);
  }

  /**
   * The getOne() retrieves a product by the given
   * id from the backend endpoint
   * @param id
   */
  getProduct(id: string):Observable<Product> {

    // the modified url for the backend endpoint
    const searchUrl = `${this.baseUrl}/product/${id}`;

    return this.http.get<Product>(searchUrl);

  }

  /**
  * The getAllCategories() retrieves a product by the given
  * id from the backend endpoint
  * @param id
  */
  getAllCategories(): Observable<Category[]> {

    return this.http.get<Category[]>('/api/categories/');

  }
   /**
   * The createUser() retrieves a product by the given
   * id from the backend endpoint
   * @param id
   */
  createProduct(product: Product): Observable<Object> {
        var header = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        return this.http.post<Product>(`${this.apiUrl}/products/add`, JSON.stringify(product), {
            headers: header
        });

    }

    deleteProduct(productId: String) {

      // the modified url for the backend endpoint
      const searchUrl = `${this.baseUrl}/delete/${productId}`;

      return this.http.delete(searchUrl);

    }

  /**
   * The getAllContainingSearchString() retrieves all products
   * that contain the given search string from the backend endpoint
   * @param searchStr
   */
  getAllContainingSearchString(searchStr: string): Observable<Product[]> {

    // the modified url for the backend endpoint
    const searchUrl = `${this.baseUrl}/search/product/${searchStr}`;

    return this.http.get<Product[]>(searchUrl);

  }
}
