import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  productList: Product[] = [];
  
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.joinlist().subscribe(data =>{
      this.productList = data;
    });
  }
  public createImgPath (serverPath: string)  {
    return this.productService.createImagePath(serverPath);
}

}
