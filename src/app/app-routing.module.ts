import { HeaderComponent } from './site-framework/header/header.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [{ path: 'products', loadChildren: () => import('./orders/products/products.module').then(m => m.ProductsModule) }
                        
                                              
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
