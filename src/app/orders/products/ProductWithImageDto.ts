import { Product } from 'src/app/orders/products/product';
export class ProductWithImageDto{
  products: Product;
  imagePath:string;



  constructor() {
    Object.assign(this);
}
}
