import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit {

  productList: Product[] = [];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
   this.productService.getAllProducts().subscribe(data =>{
     this.productList = data;
   });
  }
}
