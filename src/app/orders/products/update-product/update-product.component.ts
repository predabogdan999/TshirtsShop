import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  
 productId: number;
  productDetails: any;
  constructor(private activatedRoute: ActivatedRoute,
    private productsService:ProductsService,
    private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( data => {
      this.productId = data.id;
       this.productsService.viewProduct(this.productId).subscribe(productData  =>{
        this.productDetails = productData; 
    });
  });
  }
  
  updateProduct(form){
     const updateDetails = {
      productId: form.value.productId,
        categoryId: form.value.categoryId,
        productName: form.value.productName,
        description:  form.value.description,
        rating:  form.value.rating, 
        price:  form.value.price,
        productImg:  '',
        color:  form.value.product_color,
        warranty:  form.value.warranty,
    }
    console.log(updateDetails);
     this.productsService.updateProduct(this.productId, updateDetails).subscribe(data =>{
      console.log(data); 
    });
  this.router.navigate(['/products']);
  }
}
