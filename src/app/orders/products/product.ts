import {Images} from './Images';
import { Category } from './../../site-framework/Category';
export class Product {
  products: Product;
    productId: number;
    productName: string;
    categoryId: number;
    categories: Category;
    productImg: string;
    description: string;
    Files: string[];
    Images: Images ;
    rating: number;
    price: number;
    color: string;
    warranty: number;
    startDate: Date;
    endDate: Date;
    imagePath: string;
    constructor() {
        Object.assign(this);
    }


}
