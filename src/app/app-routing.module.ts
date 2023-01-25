import { ViewLinqComponent } from './orders/products/view-linq/view-linq.component';
import { CreateProductComponent } from './orders/admin-credentials/create-product/create-product.component';
import { RegisterEditorComponent } from './register-editor/register-editor.component';

import { AuthServiceService } from 'src/app/auth-service.service';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './site-framework/header/header.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [{ path: 'products', loadChildren: () => import('./orders/products/products.module').then(m => m.ProductsModule) },
                        {path: 'linqlist', component:ViewLinqComponent},
                       {path: 'login',component:LoginComponent},
                       {path: 'register', component:RegisterComponent},
                       {path: 'register-admin', component:RegisterAdminComponent},
                       {path: 'register-editor', component:RegisterEditorComponent},
                     //
                     //{ path: '**', pathMatch: 'full', component: PagenotfoundComponent },
                     //  {path: 'create-product', component:CreateProductComponent}
                       {path: 'create-product', loadChildren: () => import('../app/orders/admin-credentials/create-product.module').then(m => m.CreateProductModule),canActivate:[AuthGuard]},
                       {path: 'delete-product/:id', loadChildren: () => import('../app/orders/admin-credentials/delete-product/delete-product.module').then(m => m.DeleteProductModule),canActivate:[AuthGuard]},
                       {path: 'update-product/:id', loadChildren: () => import('../app/orders/admin-credentials/update-product/update-product.module').then(m => m.UpdateProductModule),canActivate:[AuthGuard]}



];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {enableTracing: false}), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
