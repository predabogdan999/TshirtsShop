import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/orders/products/product';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isLoading:boolean;
  query: string ;
  private searchSubs: Subscription;
  private obs : Subscription;
  @Output() search:EventEmitter<string> = new EventEmitter<string>();
  filteredName:Observable<Product[]>;

  productList: Product[]=[];
  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.productsService.getSearch().pipe(
                                          tap(() =>this.isLoading = true),
                                          debounceTime(500)
                                         ).subscribe(name =>{
    if(name.length >= 3 || name.length == 0)
       this.filteredName = this.productsService.searchNameAndDescription(name).pipe(
                                         finalize(() => this.isLoading = false))
  });
  }

  searchThis(query: string){
    return this.search.emit(query);
  }


}
