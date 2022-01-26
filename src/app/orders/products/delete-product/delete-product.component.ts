import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  productId = 0;

  constructor( private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( data => {
      this.productId = data.id;
  });
  this.productService.deleteProduct(this.productId).subscribe( deleteData =>{
    console.log('Deleted Product');
  });
  this.router.navigate(['/products']);
  }
}
