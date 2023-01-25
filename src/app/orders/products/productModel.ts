import {Images} from './Images';
import { Byte } from '@angular/compiler/src/util';
import { Category } from '../../site-framework/Category';
export class ProductModel {
  productId: number;
    productName: string;
    categoryId: number;
    categories: Category;
    productImg: string;
    description: string;
    Files: ArrayBuffer ;
    Images: Images [];
    rating: number;
    price: number;
    color: string;
    warranty: number;
    startDate: Date;
    endDate: Date;

  constructor() {
      Object.assign(this);
  }
}

