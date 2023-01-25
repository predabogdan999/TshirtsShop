import { Images } from './../Images';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { format } from 'date-fns';
import { Product } from './../product';
import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { NEVER, Subscription, throwError } from 'rxjs';
import { CountdownConfig } from 'ngx-countdown';
import { timer } from 'rxjs';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})

export class ViewProductComponent implements OnInit {
  productId = 0;
  productDetails: any ;
  productList: Product[]=[];
  isAdmin = false;
  authenticated = false;
  imagesList: Images[];

  private authStatusSub: Subscription;




  constructor( private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private authService:AuthServiceService) {}

  ngOnInit(): void {
     this.activatedRoute.params.subscribe( data => {
      this.productId = data.id;
   this.productsService.viewProduct(this.productId).pipe(catchError(error =>{ if(error.status === 404){
                                                                                window.location.href = 'http://localhost:4200/**';
                                                                                return NEVER;
                                                                              }
                                                                                return throwError(new Error( 'The product has exipred'));
                                                                            }
   )).subscribe(productData =>{ this.productDetails = productData;});
     this.productsService.getImagesById(this.productId).subscribe(data =>{
          this.imagesList = data;
     });
   });

   if(this.authService.isUserAuthenticated()){
     this.isAdmin = this.authService.isAdmin();
   }

   this.authenticated = this.authService.isUserAuthenticated();
  }

  deleteProd(){
    this.productsService.deleteProduct(this.productId).subscribe( deleteData =>{
    });


  }
  public createImgPath (serverPath: string)  {
    return this.productsService.createImagePath(serverPath);
  }

addToExpired(product){
  this.productsService.AddToExpiredProducts(product).subscribe();
  this.productsService.viewProduct(product).subscribe(data =>{
    this.router.navigate(['**'], { replaceUrl: true });
  });
}

}



