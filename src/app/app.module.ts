import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from './orders/products/products.module';
import { HeaderComponent } from './site-framework/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SiteFrameworkModule } from './site-framework/site-framework.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SiteFrameworkModule,
    ProductsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
