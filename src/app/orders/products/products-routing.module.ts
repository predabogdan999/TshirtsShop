import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './../../orders/products/cart/cart.component';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { GroupByCategoriesComponent } from './group-by-categories/group-by-categories.component';
import { GridComponent } from './grid/grid.component';
import { ListProductComponent } from './list-product/list-product.component';
import { AuthGuard } from './../../auth.guard';

import { UpdateProductComponent } from '../admin-credentials/update-product/update-product/update-product.component';
import { DeleteProductComponent } from 'src/app/orders/admin-credentials/delete-product/delete-product.component';
import { ViewAllProductsByCategoryComponent } from './view-all-products-by-category/view-all-products-by-category.component';
import { CreateProductComponent } from '../admin-credentials/create-product/create-product.component';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from 'src/app/auth-service.service';

const routes: Routes = [
                       { path: '', component: ViewAllProductsComponent },
                       // { path: 'create-product', component: CreateProductComponent,canActivate:[AuthGuard]} ,
                       //{ path:'create-product', loadChildren:() => import('../admin-credentials/create-product.module').then(m => m.CreateProductModule)},
                        { path: 'category/:id', component: ViewAllProductsByCategoryComponent} ,
                       //{ path: 'delete-product/:id', component: DeleteProductComponent,canActivate:[AuthGuard]},
                        { path: 'product/:id', component: ViewProductComponent},
                        { path : 'product', component:ListProductComponent},
                        { path : 'grid', component:GridComponent},
                        { path : 'group', component:GroupByCategoriesComponent},
                        { path : 'favorite', component:FavoriteProductsComponent},
                        { path : 'cart', component:CartComponent},
                        { path: 'checkout', component: CheckoutComponent}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
