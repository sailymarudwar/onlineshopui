import {User} from "./user";

/**
 * The CartItem class models the essential
 * information of a Product for use in the cart service
 */
export class Order {

  id: string;
  user: User;
  amount: number;
  totalItems:number
  createTime: Date;
  updateTime: Date;

  constructor(user: User) {
    this.id = null;
    this.user = user;
    this.amount = 0;
  }
}
