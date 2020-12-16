import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../model/category";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  // to hold the fetched categories
  categories: Category[];
  selectedValue:Category;

  constructor(private categoryService: CategoryService,private router: Router) { }

  ngOnInit(): void {
    this.fetchCategories();
  }
  onChange(e, v) {
   for(let a of v) {
     this.router.navigateByUrl(`/category/`+a.value);
    }
  }

  /**
   * The fetchCategories() retrieves all categories
   * to dynamically display the category menu items.
   */
  fetchCategories() {

    this.categoryService.getAll().subscribe(
      data => {
        this.categories = data;
      }
    );

  }
}
