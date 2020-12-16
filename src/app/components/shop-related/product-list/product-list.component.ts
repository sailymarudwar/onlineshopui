import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../model/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // to hold the fetched products
  products: Product[];
  // to hold the category type
  currentCategoryType: number;
  // to decide which fetch-product method to use
  hasSearchString: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.fetchProducts();
    });

  }

  /**
   * The fetchProducts() decides how to display the
   * products, based on the route parameters.
   *
   * If there's a search string in the route, then display
   * products based on it.
   *
   * If there's a category type in the route, then display
   * products based on it.
   * @private
   */
  private fetchProducts() {

    // is there a search string in the route?
    this.hasSearchString = this.route.snapshot.paramMap.has('searchStr');

    if (this.hasSearchString) {
      // yes, there is
      this.handleProductListBySearch();
    } else {
      // no, there isn't; retrieve products by category
      this.handleProductListByCategory();
    }

  }

  /**
   * The handleProductListByCategory() retrieves
   * all products based on the category type
   * from the route parameter.
   * @private
   */
  private handleProductListByCategory() {

    // is there a category type in the route?
    const isCategoryPresent: boolean = this.route.snapshot.paramMap.has('categoryType');

    if (isCategoryPresent) {
      // yes, there is; convert to number
      this.currentCategoryType = +this.route.snapshot.paramMap.get('categoryType');
    } else {
      // no, there isn't; set a default value
      this.currentCategoryType = 0;
    }

    // retrieve the products for given category
    this.productService.getAll(this.currentCategoryType).subscribe(
      data => {
        this.products = data;
      }
    );

  }

  /**
   * The handleProductListBySearch retrieves
   * all products based on the keyword
   * from the route parameter.
   * @private
   */
  private handleProductListBySearch() {

    // get the search string from the route
    const searchStr = this.route.snapshot.paramMap.get('searchStr');

    // retrieve the products containing the search string
    this.productService.getAllContainingSearchString(searchStr).subscribe(
      data => {
        this.products = data
        // log the data for debugging
        console.log(data);
      },
      error => {
        this.products = error.error;
      } 
    );

  }
}
