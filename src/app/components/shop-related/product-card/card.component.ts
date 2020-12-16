import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../model/cart-item';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // the following annotated variables
  // are assigned data via interpolation when
  // using this component's selector
  @Input() id: string;
  @Input() imageUrl: string;
  @Input() name: string;
  // to hold the product that will be
  // sent to the cart, if requested
  @Input() product: Product;
  user: User;

  constructor(private cartService: CartService,
    private userService: UserService, private productService: ProductService,private _snackBar: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.user.role = 'ROLE_CUSTOMER';
    this.user.firstName = 'dummy';
    this.fetchActiveUser();
  }

  /**
  * The fetchActiveUser() retrieves the active user
  * from the session.
  */
  fetchActiveUser() {
    this.userService.getActiveUser().subscribe(
      data => {
        // store the active user
        this.user = data;
      }, error => {
        console.log(error);
      }
    );
  }

  onDelete(product: Product) {
    if (confirm('Are you sure to delete this product ' + product.name)) {
      this.productService.deleteProduct(product.id).subscribe(
        data => {
          console.log(data);
          alert('Product Deleted Successfully');
          window.location.reload();
        }, error => {
          alert(error.error.text);
          window.location.reload();
        }
      );
    }
  }

  addToCart(product: Product) {
    // get the active session user
    this.userService.getActiveUser().subscribe(
      data => {
        this.user = data;

        // build the cart item
        let cartItem: CartItem = new CartItem(product, this.user);
        // save to backend
        this.cartService.addItem(cartItem).subscribe(
          data => {
            let element = document.getElementById('cartCount') as HTMLElement;
            this.cartService.getTotalQuantity().subscribe(
              count => {
                if (element != null) {
                  element.children[0].innerHTML = count + '';
                }
                product.stock = product.stock - 1;

                const snack = this._snackBar.open(cartItem.product.name + ' added to cart', 'Go to Cart', {
                  duration: 5000,
                  verticalPosition: 'top'
                });               
                snack.onAction().subscribe(() => {
                  this.router.navigateByUrl('/cart-details');
                });
              });
          }, error => {
            console.log(error);
          }
        );
      }, error => {
        console.log(error);
      }
    );
  }
}
