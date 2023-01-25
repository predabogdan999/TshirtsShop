import { ProductsService } from '../../../products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../products/product';
import { Category } from 'src/app/site-framework/Category';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  whichImage = false;

  fileName: string;
  categ;
  categoryList:  Category[] = [];
 productId: number;
  productDetails: any;
  productList: Product[];
  file: File;
  url: string | ArrayBuffer | null | undefined;

  response: {dbPath : '' };

  constructor(private activatedRoute: ActivatedRoute,
    private productsService:ProductsService,
    private router : Router) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categoriesData =>{
      this.categoryList = categoriesData;
      debugger;
    });


    this.activatedRoute.params.subscribe( data => {
      this.productId = data.id;
       this.productsService.viewProduct(this.productId).subscribe(productData  =>{
        this.productDetails = productData;
        console.log(this.productDetails)


      });
    });
    this.productsService.getAllProducts().subscribe(newData=>{
      this.productList = newData;
    });
  }


  updateProduct(form){
     const updateDetails = {
      productId: form.value.productId,
       categoryId: form.value.product_category,
        productName: form.value.productName,
        description:  form.value.description,
        rating:  form.value.rating,
        price:  form.value.price,
        productImg:  this.response.dbPath,
        color:  form.value.product_color,
        warranty:  form.value.warranty,
        startDate: form.value.start,
        endDate: form.value.end
    }
    console.log(updateDetails);
     this.productsService.updateProduct(this.productId, updateDetails).subscribe(data =>{
      this.productsService.getAllProducts().subscribe(data =>{
        this.productList = data;
        this.router.navigate(['/products']);
      });
    });
  }
  showInfo(value){
    let selectedOps  = this.categoryList.find( opt => opt.id == value);
    this.categ = selectedOps?.categoryName;
  }

  public createImgPath (serverPath: string)  {
    return this.productsService.createImagePath(serverPath);
  }
public uploadFinished (event){
  this.whichImage = true;
  this.response = event;
}
public changeImage(){
  return this.productsService.createImagePath(this.response.dbPath);
}

}

