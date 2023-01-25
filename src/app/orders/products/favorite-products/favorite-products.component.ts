import { Product } from 'src/app/orders/products/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.css']
})
export class FavoriteProductsComponent implements OnInit {
  fav:string | null ;
  stored: any;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.fav =localStorage.getItem('favorite')
    this.stored = JSON.parse(this.fav || '{}' );
  }
  public createImgPath (serverPath: string)  {
    return this.productService.createImagePath(serverPath);
  }
  removeFromFavorite(index){
    this.stored.splice(index,1);
    console.log(this.stored)
    localStorage.setItem('favorite', JSON.stringify(this.stored));
  }

}
