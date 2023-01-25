import { UpdateProductRoutingModule } from './update-product-routing.module';
import { CreateProductModule } from './../create-product.module';
import { UpdateProductComponent } from 'src/app/orders/admin-credentials/update-product/update-product/update-product.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiteFrameworkModule } from 'src/app/site-framework/site-framework.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    UpdateProductComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    CreateProductModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule ,
    SiteFrameworkModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule ,
    UpdateProductRoutingModule
  ],
  exports:[UpdateProductComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UpdateProductModule { }
