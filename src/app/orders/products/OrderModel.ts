import { CartModel } from './CartModel';
import { ProductWithImageDto } from './ProductWithImageDto';
export class OrderModel {

      name: string;
      email:string;
      city: string;
      number: string;
      postalCode:string;
      phoneNumber: string;
      paymentMethod:string;
      productsList: CartModel[];
      street: string;
      total:number;

  constructor() {
      Object.assign(this);
  }
}


