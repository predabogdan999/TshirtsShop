import { ProductChatModel } from './../../../signalR/ProductChatModel';
import { ChatModel } from './../../../signalR/ChatModel';
import { SizeAndStock } from './../SizeAndStock';
import { SizeByStock } from './../SizeByStock';
import { SizeProduct } from './../SizeProduct';
import { StocProduct } from './../StocProduct';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductWithImageDto } from './../ProductWithImageDto';
import { Images } from './../Images';
import { AuthGuard } from './../../../auth.guard';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { Subscription, Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Category } from 'src/app/site-framework/Category';
import { CartModel } from '../CartModel';
import * as signalR from "@microsoft/signalr";
import { SignalrService } from 'src/app/signalR/signalr.service';
@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})

export class ViewAllProductsComponent implements OnInit {
  token: string;
  categoryList:  Category[] = [];
  productList: Product[] = [];
  isAdmin = false;
  isEditor = false;
   authenticated = false;
  private searchSubs: Subscription;
  private authStatusSub :Subscription;
  content: any;
  imagesPathList: Images[] = [];
  favoriteList: Product[] = [];
  IdProductInactive: number[] = [];
  isFavorite =false;
  stored: any;
  storage_list: Product[] = [];
  storaged:Product[] = [];
  stocProd: StocProduct[] = [];
  stoc: number;
  size:string;
  productCart:Product;
  selectedProductSizeStoc : CartModel[] = [];



  constructor(private productService: ProductsService,
    private signalRService: SignalrService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private authService:AuthServiceService,
    private authGuard: AuthGuard,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.signalRService.startConnection('https://localhost:7285/hub');
    this.addTransferProductDataListener();
    this.addTransferUpdateProductDataListener();
    this.startHttpRequest();

    this.productService.getProductWithImage().subscribe(data =>{
      this.productList = data;
    });
    this.productService.getCategories().subscribe(data =>{
      this.categoryList = data;
     });



   if(this.authService.isUserAuthenticated()){
   this.isAdmin = this.authService.isAdmin();
   this.isEditor = this.authGuard.isEditor();
   }

    this.searchSubs = this.productService.getSearch().pipe(debounceTime(500)).subscribe(datas =>{

      if(datas == '' || typeof datas == 'undefined' ){
        this.productService.getProductWithImage().subscribe(data =>{
          this.productList = data;
        });
      }
      if(datas.length >= 3)
          this.productService.searchNameAndDescription(datas).subscribe(response =>{
          this.productList = response;
           });

   });

   this.authStatusSub=  this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.authenticated = isAuthenticated;
    });

  this.authenticated = this.authService.isUserAuthenticated();
  this.getOldFavoriteProduct();

 }

 public addTransferProductDataListener = () => {
  this.signalRService.hubConnection.on('ProductReceived',  (message: ProductChatModel) => {
    console.log("execute as real time: " + JSON.stringify(message));
    this.startHttpRequest();
  });
}
public addTransferUpdateProductDataListener = () => {
  this.signalRService.hubConnection.on('ProductUpdated',  (message: ProductChatModel) => {
    console.log("execute as real time: " + JSON.stringify(message));
    this.startHttpRequest();
  });
}
startHttpRequest(){
  this.productService.getProductWithImage().subscribe(data =>{
    this.productList = data;
  });
}
 ngOnDestroy(): void {
  this.searchSubs.unsubscribe();
  this.authStatusSub.unsubscribe();
 }
 public createImgPath (serverPath: string)  {
     return this.productService.createImagePath(serverPath);
}
getOldFavoriteProduct(){
  if (localStorage.getItem('favorite') != undefined)
  {
     this.favoriteList = JSON.parse(localStorage.getItem('favorite') || '{}' )  ;
     this.favoriteList.forEach(element => this.IdProductInactive.push(element.products.productId) )
  }
}
allProducts(){
  this.productService.getProductWithImage().subscribe(data =>{
    this.productList = data;
  });
}
toggleView(change){
 this.productService.getProductWithImageByCategoryId(change).subscribe(data => {
   this.productList = data;
 });
}
addToFavorite(product){
  if ( localStorage.getItem('favorite') == undefined)
  {
     this.favoriteList.push(product);
     localStorage.setItem("favorite",JSON.stringify(this.favoriteList));
     this.IdProductInactive.push(product.products.productId);
  }
  else
  if(this.favoriteList.indexOf(product)==-1 ){

      this.favoriteList.push(product) ;
      localStorage.setItem("favorite",JSON.stringify(this.favoriteList));
       this.IdProductInactive.push(product.products.productId);


  this.stored = JSON.parse(localStorage.getItem('favorite') || '{}' );
  localStorage.setItem("favorite",JSON.stringify(this.stored));
  }

}
removeFromFavorite(index,productId){

  this.favoriteList.splice(this.IdProductInactive.indexOf(productId), 1);
  localStorage.setItem('favorite', JSON.stringify(this.favoriteList));
  this.IdProductInactive.splice(this.IdProductInactive.indexOf(productId), 1);

}
addToCart(cartModelList: CartModel[]){
  // Verify in the product was already added into the cart.
  localStorage.setItem("cart", JSON.stringify(cartModelList));

}

openDialog(product){
  const dialogRef = this.dialog.open(AddCartDialog, {
    width: '250px',
    data:{Size: this.size,
          Stoc: this.stoc,
          productCart: product }
  });

  dialogRef.afterClosed().subscribe(results => {
    var cartModel: CartModel = {
      size: results.size,
      stoc: results.stoc,
      productCart: product
    };
    if(localStorage.getItem('cart') ==  undefined)
    {
      this.selectedProductSizeStoc.push(cartModel);
      this.addToCart(this.selectedProductSizeStoc);
    }
    else{
       this.selectedProductSizeStoc = JSON.parse(localStorage.getItem('cart') || '{}' );
       var alreadyInsertedProduct = this.selectedProductSizeStoc.find(productModel =>
                                    productModel.productCart.products.productId == cartModel.productCart.products.productId &&
                                    productModel.size == results.size);

    if (alreadyInsertedProduct === undefined)
    {
      this.selectedProductSizeStoc.push(cartModel);
    } else {
      alreadyInsertedProduct.stoc = alreadyInsertedProduct.stoc +  cartModel.stoc;
      cartModel = alreadyInsertedProduct;
    }
     this.addToCart(this.selectedProductSizeStoc);
  }
  });
}
}






@Component({
  selector: 'add-cart-dialog',
  templateUrl: 'add-cart-dialog.html',
  styleUrls: ['add-cart-dialog.css']
})
export class AddCartDialog {
  sizeProduct: string;
  selectedSize: string;
  productsStoc: StocProduct[] = [];
  productsSize: SizeProduct[] = [];
  sizebyStock: SizeByStock[] = [];
  sizeAndStockProduct:SizeAndStock[] = []
  stockbySize:number;
  soldOut = false;
  distinctSize: SizeAndStock[]

  productIdSelected:number;
  constructor(
    public signalRService: SignalrService,
    public dialogRef: MatDialogRef<CartModel>,
    @Inject(MAT_DIALOG_DATA) public cartModel: CartModel,
    private productService: ProductsService,
  ) {}





  ngOnInit(): void {
    this.signalRService.startConnection('https://localhost:7285/hub');
    this.addTransferChartDataListener();

   // this.startHttpRequest();


  this.productService.getSizeProducts().subscribe(data => {
    this.productsSize = data;
  });
  this.productService.getStocProducts().subscribe(data => {
    this.productsStoc = data;
  });

  this.productService.getSizebyStock().subscribe(data =>{
    this.sizebyStock = data;

    this.productIdSelected = this.cartModel.productCart.products.productId;


    this.sizebyStock.forEach(element => {
       if(element.productId == this.productIdSelected){

          this.sizeAndStockProduct = element.size;
       }
    });
    if(this.sizeAndStockProduct == undefined || this.sizeAndStockProduct.length === 0){
       this.soldOut = true;
    }else{
      this.soldOut = false;
    }

  });


}

public addTransferChartDataListener = () => {
  this.signalRService.hubConnection.on('messageReceived',  (message: ChatModel) => {
    console.log("execute as real time: " + JSON.stringify(message));

    this.startHttpRequest();

  });
}

startHttpRequest(){
  this.productService.getSizebyStock().subscribe(data =>{
    this.sizebyStock = data;

    this.productIdSelected = this.cartModel.productCart.products.productId;

    this.sizebyStock.forEach(element => {
       if(element.productId == this.productIdSelected){

          this.sizeAndStockProduct = element.size;
       }
    });
    console.log( this.sizeAndStockProduct  );
    if(this.sizeAndStockProduct == undefined || this.sizeAndStockProduct.length === 0){
       this.soldOut = true;
    }else{
      this.soldOut = false;
    }
  });
}
  setStockAndSize(event){
    this.sizeAndStockProduct.forEach(element =>{
      if(element.size == event)
        this.stockbySize = element.stock;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  checkStock(id){
    console.log(id);
  }
}



