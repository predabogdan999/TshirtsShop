import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/orders/products/product';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  productId = 0;
  productList: Product[]=[];

  constructor( private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( data => {
      this.productId = data.id;
  });
  this.productService.deleteProduct(this.productId).subscribe( deleteData =>{
  });
  this.productService.getAllProducts().subscribe(data =>{
    this.productList = data;
    this.router.navigate(['/products']);
  });
  }
}
