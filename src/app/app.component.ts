import { ProductsService } from './orders/products/products.service';
import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularCRUD';
 

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    
  }
 
}

