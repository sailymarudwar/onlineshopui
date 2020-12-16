import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * The search() navigates to the specified url, which
   * is a special instance of the product-list component.
   * Refer to the product-list component for more details.
   *
   * The #input data (from the html page) is the payload
   * in this url; it's housed in the ${searchStr} variable.
   *
   * The product-list component performs operations on the payload.
   * @param searchStr
   */
  search(searchStr: string) {
    this.router.navigateByUrl(`/search/${searchStr}`);
  }
}
