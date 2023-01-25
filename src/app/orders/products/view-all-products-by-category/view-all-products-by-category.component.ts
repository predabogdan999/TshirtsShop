import { Category } from './../../../site-framework/Category';
import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-view-all-products-by-category',
  templateUrl: './view-all-products-by-category.component.html',
  styleUrls: ['./view-all-products-by-category.component.css']
})
export class ViewAllProductsByCategoryComponent implements OnInit {
  imagePath = "/assets/";
  searchCategory : Category[] = [];
  productList: Product[] = [];
  
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductsService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( data => {
      this.searchCategory = data.id;  
    this.productService.searchCategoryProducts(this.searchCategory).subscribe(categoryData =>{
      this.productList = categoryData;
    });
  });
  this.productService.getSearch().subscribe(datas =>{
    this.productService.searchNameAndDescription(datas).subscribe(response =>{
    this.productList = response;
    });
  });
  }
  public createImgPath (serverPath: string)  {
    return this.productService.createImagePath(serverPath);
}

   
}
