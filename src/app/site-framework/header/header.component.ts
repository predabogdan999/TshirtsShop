import { Category } from './../Category';
import { Component, OnInit } from '@angular/core';

import { ProductsService } from './../../orders/products/products.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  categoryList:  Category[] = [];
  constructor(private productsService: ProductsService) {
    
   }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(data =>{
      
     this.categoryList = data;
    });
  }
 

}
