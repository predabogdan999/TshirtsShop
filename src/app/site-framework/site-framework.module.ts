import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SearchComponent

  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule ,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    MatBadgeModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent

  ]
})
export class SiteFrameworkModule { }
