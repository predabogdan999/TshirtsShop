import { OrderModel } from './OrderModel';
import { CartModel } from './CartModel';
import { SizeProduct } from './SizeProduct';
import { StocProduct } from './StocProduct';
import { ProductModel } from './productModel';
import { Category } from 'src/app/site-framework/Category';

import { Product } from './product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, NEVER, Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Images } from './Images';
import { ProductWithImageDto } from './ProductWithImageDto';
import { SizeByStock } from './SizeByStock';





@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  response: File[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
  public DataDetails: any = [];
  url = 'https://localhost:7285/api/Product/';
  urlImages = 'https://localhost:7285/api/image/';
  urlStoc = 'https://localhost:7285/api/Stoc/';
  urlOrder = 'https://localhost:7285/api/Order/';
  private SearchSub = new Subject<string>();
  result:any;
  constructor(private httpClient: HttpClient,
    private router: Router) { }

 searchData(stringName:string): void{
  this.SearchSub.next(stringName);
 }
 getSearch(){
   return this.SearchSub.asObservable()
 }
 getFiles(){
   return this.response;

 }
 setFiles(files){
   this.response = files;
 }

 searchNameAndDescription(stringSearch): Observable<Product[]>{
   if(stringSearch == null)
     return this.getProductWithImage();
   return this.httpClient.get<Product[]>(this.url+ 'search?name=' + stringSearch);
 }


  upload(file):Observable<any> {
    const formData = new FormData();
      formData.append("file", file, file.name);
      return this.httpClient.post(this.url, formData)

  }

  public createImagePath (serverPath: string)  {
   return `https://localhost:7285/${serverPath}`;
 }

  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'List');
  }

  getProduct(productId: number): Observable<Product>{
    return this.httpClient.get<Product>(this.url + 'Details?productId='  + productId);
  }
  getProductWithImage(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'getImage')
  }
  getProductWithImageByCategoryId(categoryId): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'getProductsByCategory/' + categoryId);
  }

  getCategories():Observable <Category[]>{
    const categoriesUrl = 'https://localhost:7285/api/Category/';
    return this.httpClient.get<Category[]>(categoriesUrl);
  }

  createProduct(productBody): Observable <ProductModel>{
    return this.httpClient.post<ProductModel>(this.url + 'CreateRecord', productBody, this.httpOptions);
  }
  viewProduct(productId): Observable <Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'details/' + productId) ;
  }
  errorHandler(error:HttpErrorResponse){
    if(error.status === 404){
      window.location.href = 'http://localhost:4200/**';
      return NEVER;
    }
    return throwError(error.message || 'server error');
  }
  updateProduct(productId, productBody): Observable <ProductModel>{
    return this.httpClient.put<ProductModel>(this.url + 'UpdateProduct/' + productId, productBody, this.httpOptions);
  }
  deleteProduct(productId): Observable <Product>{
    return this.httpClient.post<Product>(this.url + 'DeleteProduct/' + productId , null);
  }
  searchCategoryProducts(categoryId): Observable <Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'listbycategory/' + categoryId);
  }
  listLinq(): Observable<Product[]>{
   return this.httpClient.get<Product[]>(this.url + 'linqlist');
  }
  joinlist(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'joinlist');
  }
  groupbylist(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'groupbylist');
  }
  AddToExpiredProducts(productId): Observable<Product>{
    return this.httpClient.post<Product>(this.url + 'expiration/' + productId, null);
  }
  selectTop(number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'selectproducts/' + number);
  }
  getImagesById(id): Observable<Images[]>{
    return this.httpClient.get<Images[]>(this.urlImages + 'imgbyid/' + id);
  }
  getStocProducts(): Observable<StocProduct[]>{
    return this.httpClient.get<StocProduct[]>(this.urlStoc + 'getStock');
  }
  getSizeProducts(): Observable<SizeProduct[]>{
    return this.httpClient.get<SizeProduct[]>(this.urlStoc + 'getSize');
  }
  addNewOrder(order):Observable<OrderModel>{
    return this.httpClient.post<OrderModel>(this.urlOrder + 'createOrder', order, this.httpOptions);
  }
  getSizebyStock():Observable<SizeByStock[]>{
    return this.httpClient.get<SizeByStock[]>(this.urlStoc + 'getSizebyStock' );
  }








}
