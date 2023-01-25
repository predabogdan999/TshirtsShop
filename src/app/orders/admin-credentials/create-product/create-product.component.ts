import { Category } from './../../../site-framework/Category';
import { Product } from 'src/app/orders/products/product';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup,FormArray, Validators} from '@angular/forms';

import { JsonConvert } from 'json2typescript';
import {ReactiveFormsModule } from '@angular/forms'
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
   message: string;

   dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  productList : Product[]=[];
  file: File ;
  categoryList:  Category[] = [];
  categ;
  url : any;
  productForm: any;
  formData:  FormData;


  response: any;

  constructor(private productsService: ProductsService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categoriesData =>{
      this.categoryList = categoriesData;
    });
    this.productsService.getAllProducts().subscribe(newData=>{
       this.productList = newData;
     });

  }
  addNewProduct(form){
    let newProduct= {
     categoryId: form.value.product_category,
     productName: form.value.product_name,
     description: form.value.product_description,
     rating: form.value.product_rating,
     price: form.value.product_price,
     Files:this.response,
     color: form.value.product_color,
     warranty: form.value.warranty,
     startDate: form.value.start,
     endDate: form.value.end
   }
   console.log(JSON.stringify(newProduct))

   this.productsService.createProduct(newProduct).subscribe(data =>{
   });

   this.productsService.getAllProducts().subscribe(data =>{
    this.productList = data;

    this.router.navigate(['/products']);
  });
  }

  showInfo(value){
    let selectedOps  = this.categoryList.find( opt => opt.id == value);
    this.categ = selectedOps?.categoryName;
  }

public uploadFinished (event){
  this.response = event;
}


}
