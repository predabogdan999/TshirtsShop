import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsService } from 'src/app/orders/products/products.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate {
   url = 'https://localhost:7285/api/auth/';
   invalidLogin:boolean;
   statusLiner = new Subject<boolean>();


   private authenticated  = this.isUserAuthenticated() ;
   private authSource = new BehaviorSubject(this.authenticated);
  constructor(private router: Router,
              private jwtHelper:JwtHelperService,
              private httpClient: HttpClient) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
 public login(credentials){
   return this.httpClient.post( this.url + "login", credentials, {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }).subscribe(response => {
    const token = (<any>response).token;
    localStorage.setItem("jwt", token);
    this.invalidLogin = false;
    if(token){
      //this.authenticated = true;
      this.authSource.next(true);
}
     this.router.navigate(['/products']);

  }, err => {
    this.invalidLogin = true;
  });
 }
  getAuthStatusListener() {

    return this.authSource.asObservable();

  }
  getIsAuth() {
    var status = this.isUserAuthenticated();
    return this.authSource.next(status);
  }
  public logout(){
    localStorage.removeItem("jwt");
    this.authSource.next(false);
      this.router.navigate(['/products']);
  }


  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  getToken():any{
    return localStorage.getItem('jwt');
  }

  public isAdmin():boolean{
  const  token = this.getToken();
  const decodedToken = this.jwtHelper.decodeToken(token);
  const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  if(role === 'Admin'){
  return true;
  }
  return false;

}


}
