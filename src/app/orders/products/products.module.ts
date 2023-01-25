import { SiteFrameworkModule } from './../../site-framework/site-framework.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { MatCardModule } from '@angular/material/card';
  import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
  import {MatButtonModule} from '@angular/material/button';
  import {MatProgressBarModule }from '@angular/material/progress-bar';
  import { MatToolbarModule} from '@angular/material/toolbar';
  import { MatIconModule } from '@angular/material/icon';
  import {MatSortModule} from '@angular/material/sort';
  import {MatTableModule} from '@angular/material/table';
import { ProductsRoutingModule } from './products-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewAllProductsComponent, AddCartDialog } from './view-all-products/view-all-products.component';
import { ViewAllProductsByCategoryComponent } from './view-all-products-by-category/view-all-products-by-category.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CountdownModule } from 'ngx-countdown';
import { DateFnsModule } from 'ngx-date-fns';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ViewLinqComponent } from './view-linq/view-linq.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryByIdPipe } from './category-by-id.pipe';
import { ListProductComponent } from './list-product/list-product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridComponent } from './grid/grid.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { GroupByCategoriesComponent } from './group-by-categories/group-by-categories.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { CartComponent } from './cart/cart.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [

    ViewProductComponent,
    ViewAllProductsComponent,
    ViewAllProductsByCategoryComponent,
    ViewLinqComponent,
    CategoryByIdPipe,
    ListProductComponent,
    GridComponent,
    GroupByCategoriesComponent,
    FavoriteProductsComponent,
    CartComponent,
    AddCartDialog,
    CheckoutComponent


  ],
  imports: [

    ProductsRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule ,
    SiteFrameworkModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CountdownModule,
    DateFnsModule,
    MatButtonToggleModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    NgChartsModule


  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ProductsModule { }
