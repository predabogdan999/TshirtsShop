import { ProductsService } from 'src/app/orders/products/products.service';
import { CartModel } from '../CartModel';
import { Component, OnInit } from '@angular/core';
import { SizeProduct } from '../SizeProduct';
import { StocProduct } from '../StocProduct';
import { SizeByStock } from '../SizeByStock';
import { SizeAndStock } from '../SizeAndStock';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productCartList: CartModel[] = [];
  isCartEmpty=true;
  cartModel: CartModel;
  sum:number;
  productsSize: SizeProduct[] = [];
  productsStoc: StocProduct[] = [];
  selectedValue: string;
  mySelect: string;
  sizebyStock: SizeByStock[] = [];
  sizeAndStockProduct:SizeAndStock[] = [];
  stockbySize:number;
  sizeForStock: SizeAndStock[] = [];
  selectQuantity: number;
  mapProductIdAndSize: Map<number,string>


  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    if(localStorage.getItem('cart') ==  undefined || localStorage.getItem('cart') == '[]')
    {
      this.isCartEmpty = true;
    }else{
      this.isCartEmpty = false;
    }
    this.productCartList = JSON.parse(localStorage.getItem('cart') || '{}' );

    this.productService.getSizeProducts().subscribe(data => {
      this.productsSize = data;
    });
    this.productService.getStocProducts().subscribe(data =>{
      this.productsStoc = data;
    });
    this.productService.getSizebyStock().subscribe(data =>{
      this.sizebyStock = data;
    });
    this.mapProductIdAndSize = new Map<number,string>();
    this.productCartList.forEach(element => {
      this.mapProductIdAndSize.set(element.productCart.products.productId, element.size);
    });

  }
  public createImgPath (serverPath: string)  {
    return this.productService.createImagePath(serverPath);
 }
 getTotalPrice(){
  this.sum = this.productCartList.reduce((acc, product) => {
    return acc + product.productCart.products.price * product.stoc ;
  }, 0);
  return this.sum;
 }

 removeProductFromCart(product){
  this.productCartList.splice(this.productCartList.indexOf(product), 1);
  localStorage.setItem('cart', JSON.stringify(this.productCartList));
 }
 updateSize(productId){
   var product =  this.productCartList.find(product => product.productCart.products.productId == productId);
   var check = this.mapProductIdAndSize.get(productId);
   if(product != undefined && check != undefined ){
      var index = this.productCartList.indexOf(product);
      this.mapProductIdAndSize.delete(productId);
      this.mapProductIdAndSize.set(productId, this.mySelect);

      this.productCartList[index].size = this.mySelect;

    this.productCartList[index].stoc = 1;
      localStorage.setItem('cart', JSON.stringify(this.productCartList));
   }
 }
 updateStock(productId){
  console.log(this.selectQuantity)
  var product =  this.productCartList.find(product => product.productCart.products.productId == productId);
  if(product != undefined){
    var index = this.productCartList.indexOf(product);
    this.productCartList[index].stoc = this.selectQuantity;
    localStorage.setItem('cart', JSON.stringify(this.productCartList));
  }
 }

 getSizeByProductId(productId ){
    this.sizebyStock.forEach(element => {
       if(element.productId == productId){
          this.sizeAndStockProduct = element.size;
       }
      });
    return this.mapProductIdAndSize.get(productId);
 }

 setStock(productId){
  var currentSize = this.mapProductIdAndSize.get(productId);
  this.sizebyStock.forEach(element => {
    if(element.productId == productId){
       this.sizeForStock = element.size;
    }
  });
  this.sizeForStock.forEach(element =>{
    if(element.size == currentSize){
      this.stockbySize = element.stock;
    }
  });
  if(this.stockbySize > 10){
    this.stockbySize = 10;
  }
}
counter(i: number) {
  return new Array(i);
}
quantity(productId){

  var product = this.productCartList.find(product => product.productCart.products.productId == productId);
  return product?.stoc;
}
}
