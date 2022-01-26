import { ProductModel } from './productModel';
import { Category } from 'src/app/site-framework/Category';

import { Product } from './product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  url = 'https://localhost:44359/api/Products/';

  constructor(private httpClient: HttpClient) { }

  

  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'List');
  }

  getProduct(productId: number): Observable<Product>{
    return this.httpClient.get<Product>(this.url + 'Details?productId='  + productId);
  }

  getCategories():Observable <Category[]>{
    const categoriesUrl = 'https://localhost:44359/api/Categories/';
    return this.httpClient.get<Category[]>(categoriesUrl);
  }

  createProduct(productBody): Observable <ProductModel>{
    return this.httpClient.post<ProductModel>(this.url + 'CreateRecord', productBody, this.httpOptions);
  }
  viewProduct(productId): Observable <Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'details/' + productId);
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


}
