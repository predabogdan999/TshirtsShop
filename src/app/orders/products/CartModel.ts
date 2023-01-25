import { Product } from "./product";
import { ProductWithImageDto } from "./ProductWithImageDto";

export interface CartModel {
  size: string;
  stoc: number;
  productCart: ProductWithImageDto;
}

