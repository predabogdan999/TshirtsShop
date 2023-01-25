import { SizeProduct } from './SizeProduct';
export class StocProduct{

  Id: number;
  productId: number;
  stoc: number;
  Size :SizeProduct;


  constructor() {
    Object.assign(this);
}
}
