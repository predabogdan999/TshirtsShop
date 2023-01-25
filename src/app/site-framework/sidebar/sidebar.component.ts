import { Product } from './../../orders/products/product';
import { ProductsService } from 'src/app/orders/products/products.service';
import { AuthServiceService } from './../../auth-service.service';
import {  Router } from '@angular/router';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartModel } from 'src/app/orders/products/CartModel';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  authenticated = false;
  prod : Product []=[];
  private searchSubs: Subscription;
  private authListenerSubs : Subscription;
  searchFilter:any ='';
  cart: CartModel[];

  favoriteList: Product[] = [];
  constructor(private router: Router,
    private authService: AuthServiceService,
    private productsService: ProductsService) { }


  ngOnInit(): void {
    this.authenticated = this.authService.isUserAuthenticated();
    this.productsService.getAllProducts().subscribe( data =>{
      this.prod = data;
    });


    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.authenticated = isAuthenticated;

    });
  }
  ngOnDestoy(){
    this.authListenerSubs.unsubscribe();
  }
  login(){
    this.router.navigate(['/login']);
    //this.authenticated = true;
  }
  register(){
    this.router.navigate(['/register']);
  }

  onLogout(){
    this.authService.logout();
   //this.authenticated = this.authService.isUserAuthenticated();
  }

  searchThis(dataString){
    this.productsService.searchData(dataString);
  }
  favoriteProductsNumber(){
    this.favoriteList = JSON.parse(localStorage.getItem('favorite') || '{}' );
     return this.favoriteList.length
  }
  CartProductsNumber(){
    this.cart = JSON.parse(localStorage.getItem('cart') || '{}' );
     return this.cart.length
  }
}
