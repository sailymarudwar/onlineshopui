import {Product} from "./product";
import {User} from "./user";

/**
 * The CartItem class models the essential
 * information of a Product for use in the cart service
 */
export class CartItem {

  id: string;
  product: Product;
  user: User;
  quantity: number;

  constructor(product: Product, user: User) {
    this.id = null;
    this.product = product;
    this.user = user;
    this.quantity = 1;
  }

}
