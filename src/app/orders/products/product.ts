import { Byte } from '@angular/compiler/src/util';
import { Category } from './../../site-framework/Category';
export class Product {
    productId: number;
    productName: string;
    categoryId: number;
    categories: Category;
    productImg: Byte;
    description: string;
    rating: number;
    price: number;
    color: string;
    warranty: number;

    constructor(productId: number,
        categoryId: number,
        categories: Category,
        productName: string,
        description: string,
        rating: number,
        price: number,
        productImg: Byte,
        color: string,
        warranty: number){
            this.productId = productId;
            this.categoryId = categoryId;
            this.categories = categories;
            this.productName = productName;
            this.description = description;
            this.rating = rating;
            this.price = price;
            this.productImg = productImg;
            this.color = color;
            this.warranty = warranty;

    }


}
