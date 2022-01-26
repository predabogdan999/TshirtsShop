import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ViewAllProductsByCategoryComponent } from './view-all-products-by-category/view-all-products-by-category.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: ViewAllProductsComponent },
                        { path: 'create-product', component: CreateProductComponent} ,
                        { path: 'category/:id', component: ViewAllProductsByCategoryComponent} ,
                        { path: 'delete-product/:id', component: DeleteProductComponent},
                        { path: 'product/:id', component: ViewProductComponent},
                        { path: 'update-product/:id', component: UpdateProductComponent}                 
 ];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
