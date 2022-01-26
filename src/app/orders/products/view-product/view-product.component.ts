import { Product } from './../product';
import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})

export class ViewProductComponent implements OnInit {
  productId = 0;
  productDetails: any ;


  constructor( private activatedRoute: ActivatedRoute,
    private productsService: ProductsService) {}

  ngOnInit(): void {
     this.activatedRoute.params.subscribe( data => {
      this.productId = data.id;
   
   this.productsService.viewProduct(this.productId).subscribe(productData =>{
      this.productDetails = productData;
    });
   });

  }
  onSelect(details: Product): void{
    this.productDetails = details;
  }
  deleteProd(){
    this.productsService.deleteProduct(this.productId).subscribe( deleteData =>{
      console.log('Deleted Product');
    });
  }
 
}



