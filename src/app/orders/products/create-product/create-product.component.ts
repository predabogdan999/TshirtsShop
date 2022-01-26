import { Router } from '@angular/router';
import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/site-framework/Category';
import { Product } from '../product';
import { FormControl, FormBuilder, FormGroup,FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  categoryList:  Category[] = [];
  categ;
  message = "";
  productForm: any;
 

  constructor(private productsService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categoriesData =>{
      this.categoryList = categoriesData;
    });
  }
   addNewProduct(form){
    let newProduct= {
     categoryId: form.value.product_category,
     productName: form.value.product_name,
     description: form.value.product_description,
     rating: form.value.product_rating,
     price: form.value.product_price,
     productImg: '',
     color: form.value.product_color,
     warranty: form.value.warranty
   }
   this.productsService.createProduct(newProduct).subscribe(data =>{
     console.log(data);
   });
   this.router.navigate(['/products']);

  }

  showInfo(value){
    let selectedOps  = this.categoryList.find( opt => opt.id == value);
    this.categ = selectedOps?.categoryName;
  }
}
