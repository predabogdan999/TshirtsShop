import { CreateProductRoutingModule } from './create-product-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SiteFrameworkModule } from 'src/app/site-framework/site-framework.module';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CreateProductComponent } from './create-product/create-product.component';
import { UploadComponent } from './upload/upload.component';



@NgModule({
  declarations: [ 
    CreateProductComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    CreateProductRoutingModule
  ],
   exports:[UploadComponent,CreateProductComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateProductModule { }
