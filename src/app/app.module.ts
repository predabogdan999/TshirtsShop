import { DeleteProductModule } from './orders/admin-credentials/delete-product/delete-product.module';
import { UpdateProductModule } from './orders/admin-credentials/update-product/update-product.module';
import { CreateProductModule } from './orders/admin-credentials/create-product.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from './orders/products/products.module';
import { HeaderComponent } from './site-framework/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SiteFrameworkModule } from './site-framework/site-framework.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { RegisterEditorComponent } from './register-editor/register-editor.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterAdminComponent,
    RegisterEditorComponent,
    PagenotfoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SiteFrameworkModule,
    ProductsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    CreateProductModule,
    UpdateProductModule,
    DeleteProductModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7285"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
