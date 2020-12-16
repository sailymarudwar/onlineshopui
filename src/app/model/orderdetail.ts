import { Product } from './product';
import { User } from './user';
import { Order } from './order';

/**
 * The CartItem class models the essential
 * information of a Product for use in the cart service
 */
export class OrderDetail {

	id: string;
	product: Product;
	order: Order;
	user: User;
	quantity: number;

	constructor(product: Product, user: User, order: Order) {
		this.id = null;
		this.product = product;
		this.order = order;
		this.user = user;
		this.quantity = 1;
	}

}
