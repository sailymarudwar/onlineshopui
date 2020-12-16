import {Component, Input, OnInit,ViewChild} from '@angular/core';
import {Product} from '../../../model/product';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../../services/cart.service';
import {CartItem} from '../../../model/cart-item';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user.service';
import {MatBadge} from '@angular/material/badge';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // to hold the product to display
  product: Product = new Product();
   // the following annotated variables
  // are assigned data via interpolation when
  // using this component's selector
  @Input() id: string;
  @Input() imageUrl: string;
  @Input() name: string;

  // to hold the product that will be
  // sent to the cart, if requested
  user: User;
  element: HTMLElement;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,private cartService: CartService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.user.role ='ROLE_CUSTOMER';
    this.user.firstName ='dummy';
    this.fetchActiveUser();
   // badge = document.getElementById();
    this.route.paramMap.subscribe(
      () => {
        this.handleProductDetails();
      }
    )
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

  private handleProductDetails() {

    // get the product id from the route
    const id: string = this.route.snapshot.paramMap.get('id');

    // get the product via the product service using the id
    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
      }
    );

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
            this.cartService.getTotalQuantity().subscribe(
              count => {
                const element = document.getElementById('cartCount') as HTMLElement;
                if (element != null) {
                   element.children[0].innerHTML = count + '';
                }
                product.stock = product.stock - 1;
                const snack = this._snackBar.open(cartItem.product.name+' added to Cart', 'Go to Cart', {
                  duration: 3000,
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
