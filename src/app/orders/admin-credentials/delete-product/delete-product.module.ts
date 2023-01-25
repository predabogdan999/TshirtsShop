import { DeleteProductRoutingModule } from './delete-product-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteProductComponent } from './delete-product.component';



@NgModule({
  declarations: [
    DeleteProductComponent
  ],
  imports: [
    CommonModule,
    DeleteProductRoutingModule
  ],
  exports:[DeleteProductComponent]
})
export class DeleteProductModule { }
