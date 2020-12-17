import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../model/category";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // the backend url for products, hardcoded
  readonly baseUrl: string = environment.baseUrl+'/api/categories';

  constructor(private http: HttpClient) {
  }

  /**
   * The getAll() retrieves all category types
   * from the backend endpoint
   */
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  addCategory(categoryToAdd: Category) {

    // the modified url for the backend endpoint
    const searchUrl = `${this.baseUrl}/add`;

    this.http.put(searchUrl, categoryToAdd);

  }

  editCategory(categoryToEdit: Category) {

    // the modified url for the backend endpoint
    const searchUrl = `${this.baseUrl}/edit`;

    this.http.put(searchUrl, categoryToEdit);

  }

  deleteCategory(categoryId: number) {

    // the modified url for the backend endpoint
    const searchUrl = `${this.baseUrl}/delete/${categoryId}`;

    return this.http.delete(searchUrl);

  }

  /**
   * The getOne() retrieves a product by the given
   * id from the backend endpoint
   * @param id
   */
  getCategory(id: string):Observable<Category> {

    // the modified url for the backend endpoint
    const searchUrl = `${this.baseUrl}/category/${id}`;

    return this.http.get<Category>(searchUrl);

  }
   /**
   * The createCategory() retrieves a category by the given
   * id from the backend endpoint
   * @param id
   */
  createCategory(category: Category): Observable<Category> {
        var header = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return this.http.post<Category>(`${this.baseUrl}/add`, JSON.stringify(category), {
            headers: header
        });
    }
}
